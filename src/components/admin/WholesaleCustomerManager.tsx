import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Building2, Edit, Check, X, Link2, Search } from "lucide-react";

interface WholesaleCustomer {
  id: string;
  company_name: string;
  business_type: string;
  discount_tier: string | null;
  payment_terms: string | null;
  is_active: boolean | null;
  shopify_company_location_id: string | null;
  user_id: string;
  created_at: string;
}

export default function WholesaleCustomerManager() {
  const [customers, setCustomers] = useState<WholesaleCustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<WholesaleCustomer | null>(null);
  const [locationId, setLocationId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchCustomers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("wholesale_customers")
      .select("*")
      .order("company_name");

    if (error) {
      toast.error("Failed to load wholesale customers");
      console.error(error);
    } else {
      setCustomers(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer: WholesaleCustomer) => {
    setEditingCustomer(customer);
    setLocationId(customer.shopify_company_location_id || "");
  };

  const handleSave = async () => {
    if (!editingCustomer) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("wholesale_customers")
      .update({ 
        shopify_company_location_id: locationId.trim() || null 
      })
      .eq("id", editingCustomer.id);

    if (error) {
      toast.error("Failed to update customer");
      console.error(error);
    } else {
      toast.success("Customer updated successfully");
      setEditingCustomer(null);
      fetchCustomers();
    }
    setIsSaving(false);
  };

  const toggleActive = async (customer: WholesaleCustomer) => {
    const { error } = await supabase
      .from("wholesale_customers")
      .update({ is_active: !customer.is_active })
      .eq("id", customer.id);

    if (error) {
      toast.error("Failed to update customer status");
    } else {
      toast.success(`Customer ${!customer.is_active ? "activated" : "deactivated"}`);
      fetchCustomers();
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-forest">Wholesale Customers</h2>
          <p className="text-sm text-forest/60">
            Manage B2B customers and link Shopify Company Location IDs for F&B pricing
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-forest/5">
              <TableHead>Company</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Shopify Location ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-forest/50">
                  No wholesale customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-forest/40" />
                      <span className="font-medium">{customer.company_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-forest/70">
                    {customer.business_type}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {customer.discount_tier || "standard"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {customer.shopify_company_location_id ? (
                      <div className="flex items-center gap-1 text-xs font-mono text-green-600">
                        <Link2 className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">
                          {customer.shopify_company_location_id}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-600">Not linked</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.is_active ? "default" : "secondary"}
                      className={customer.is_active ? "bg-green-600" : ""}
                    >
                      {customer.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(customer)}
                      >
                        {customer.is_active ? (
                          <X className="w-3 h-3" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Wholesale Customer</DialogTitle>
            <DialogDescription>
              Link this customer to their Shopify Company Location for F&B catalog pricing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium">Company</Label>
              <p className="text-lg font-serif">{editingCustomer?.company_name}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationId">Shopify Company Location ID</Label>
              <Input
                id="locationId"
                placeholder="gid://shopify/CompanyLocation/123456789"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Find this in Shopify Admin → Customers → Companies → [Company] → Location URL
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCustomer(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
