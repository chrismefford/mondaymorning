import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Search, Eye, Check, X } from "lucide-react";

interface WholesaleApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  business_type: string | null;
  tax_id: string | null;
  estimated_monthly_volume: string | null;
  product_interests: string[] | null;
  locations_count: number | null;
  website_url: string | null;
  additional_notes: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["pending", "pending_approval", "approved", "rejected"];

export default function WholesaleApplicationsManager() {
  const [apps, setApps] = useState<WholesaleApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<WholesaleApplication | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchApps = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("wholesale_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load applications");
      console.error(error);
    } else {
      setApps((data as WholesaleApplication[]) || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setSavingId(id);
    const { error } = await supabase
      .from("wholesale_applications")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error(`Failed to update: ${error.message}`);
      console.error(error);
      setSavingId(null);
      return;
    }
    toast.success(`Marked as ${status}`);
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected({ ...selected, status });

    if (status === "approved") {
      const { error: syncError } = await supabase.functions.invoke(
        "sync-wholesale-shopify",
        { body: { applicationId: id } }
      );
      if (syncError) {
        toast.error(`Shopify sync failed: ${syncError.message}`);
        console.error(syncError);
      } else {
        toast.success("Synced to Shopify B2B");
      }

      const { error: emailError } = await supabase.functions.invoke(
        "send-wholesale-approval",
        { body: { applicationId: id } }
      );
      if (emailError) {
        toast.error(`Welcome email failed: ${emailError.message}`);
        console.error(emailError);
      } else {
        toast.success("Welcome email sent");
      }
    }
    setSavingId(null);
  };

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    return (
      !q ||
      a.company_name?.toLowerCase().includes(q) ||
      a.contact_name?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q)
    );
  });

  const statusVariant = (status: string) => {
    if (status === "approved") return "bg-green-600 text-white";
    if (status === "rejected") return "bg-red-600 text-white";
    return "bg-amber-500 text-white";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-forest">Wholesale Applications</h2>
          <p className="text-sm text-forest/60">
            Review B2B applications submitted from the wholesale form
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
          <Input
            placeholder="Search company, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-forest/5">
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-forest/50">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company_name}</TableCell>
                  <TableCell>{app.contact_name}</TableCell>
                  <TableCell className="text-sm">
                    <a href={`mailto:${app.email}`} className="text-forest hover:underline">
                      {app.email}
                    </a>
                  </TableCell>
                  <TableCell className="text-sm text-forest/70">
                    {new Date(app.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusVariant(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelected(app)}>
                        <Eye className="w-3 h-3 mr-1" /> View
                      </Button>
                      {app.status !== "approved" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={savingId === app.id}
                          onClick={() => updateStatus(app.id, "approved")}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                      )}
                      {app.status !== "rejected" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/50 text-red-600"
                          disabled={savingId === app.id}
                          onClick={() => updateStatus(app.id, "rejected")}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.company_name}</DialogTitle>
            <DialogDescription>
              Submitted {selected && new Date(selected.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-3 text-sm py-2">
              <Row label="Contact" value={selected.contact_name} />
              <Row label="Email" value={selected.email} />
              <Row label="Phone" value={selected.phone} />
              <Row label="Business Type" value={selected.business_type} />
              <Row label="Tax ID" value={selected.tax_id} />
              <Row label="Estimated Monthly Volume" value={selected.estimated_monthly_volume} />
              <Row label="Locations" value={selected.locations_count?.toString()} />
              <Row label="Website" value={selected.website_url} />
              <Row
                label="Product Interests"
                value={selected.product_interests?.join(", ")}
              />
              <Row label="Notes" value={selected.additional_notes} multiline />
              <Row label="Status" value={selected.status} />
            </div>
          )}

          <DialogFooter className="gap-2">
            {selected && selected.status !== "approved" && (
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => updateStatus(selected.id, "approved")}
                disabled={savingId === selected.id}
              >
                <Check className="w-4 h-4 mr-1" /> Approve
              </Button>
            )}
            {selected && selected.status !== "rejected" && (
              <Button
                variant="outline"
                className="border-red-500/50 text-red-600"
                onClick={() => updateStatus(selected.id, "rejected")}
                disabled={savingId === selected.id}
              >
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
            )}
            <Button variant="outline" onClick={() => setSelected(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string | null | undefined;
  multiline?: boolean;
}) {
  if (!value) return null;
  return (
    <div className={multiline ? "" : "flex gap-3"}>
      <div className="font-medium text-forest/70 min-w-[180px]">{label}</div>
      <div className={multiline ? "mt-1 whitespace-pre-wrap" : ""}>{value}</div>
    </div>
  );
}
