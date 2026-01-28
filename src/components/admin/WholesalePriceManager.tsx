import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Search, Upload, Plus, Edit, Trash2, DollarSign } from "lucide-react";

interface WholesalePrice {
  id: string;
  product_handle: string;
  variant_id: string | null;
  wholesale_price: number;
  retail_price: number | null;
  created_at: string;
}

export default function WholesalePriceManager() {
  const [prices, setPrices] = useState<WholesalePrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPrice, setEditingPrice] = useState<WholesalePrice | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formProductHandle, setFormProductHandle] = useState("");
  const [formVariantId, setFormVariantId] = useState("");
  const [formWholesalePrice, setFormWholesalePrice] = useState("");
  const [formRetailPrice, setFormRetailPrice] = useState("");

  const fetchPrices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("wholesale_prices")
      .select("*")
      .order("product_handle");

    if (error) {
      toast.error("Failed to load wholesale prices");
      console.error(error);
    } else {
      setPrices(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const resetForm = () => {
    setFormProductHandle("");
    setFormVariantId("");
    setFormWholesalePrice("");
    setFormRetailPrice("");
  };

  const handleAdd = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleEdit = (price: WholesalePrice) => {
    setEditingPrice(price);
    setFormProductHandle(price.product_handle);
    setFormVariantId(price.variant_id || "");
    setFormWholesalePrice(price.wholesale_price.toString());
    setFormRetailPrice(price.retail_price?.toString() || "");
  };

  const handleSave = async () => {
    if (!formProductHandle || !formWholesalePrice) {
      toast.error("Product handle and wholesale price are required");
      return;
    }

    setIsSaving(true);
    const priceData = {
      product_handle: formProductHandle.trim(),
      variant_id: formVariantId.trim() || null,
      wholesale_price: parseFloat(formWholesalePrice),
      retail_price: formRetailPrice ? parseFloat(formRetailPrice) : null,
    };

    if (editingPrice) {
      const { error } = await supabase
        .from("wholesale_prices")
        .update(priceData)
        .eq("id", editingPrice.id);

      if (error) {
        toast.error("Failed to update price");
        console.error(error);
      } else {
        toast.success("Price updated successfully");
        setEditingPrice(null);
        fetchPrices();
      }
    } else {
      const { error } = await supabase
        .from("wholesale_prices")
        .insert(priceData);

      if (error) {
        if (error.code === "23505") {
          toast.error("A price for this product/variant already exists");
        } else {
          toast.error("Failed to add price");
          console.error(error);
        }
      } else {
        toast.success("Price added successfully");
        setIsAddDialogOpen(false);
        resetForm();
        fetchPrices();
      }
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("wholesale_prices")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete price");
    } else {
      toast.success("Price deleted");
      fetchPrices();
    }
  };

  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const text = await file.text();
    const lines = text.split("\n").filter(line => line.trim());
    
    // Skip header row
    const dataLines = lines.slice(1);
    let successCount = 0;
    let errorCount = 0;

    for (const line of dataLines) {
      const [productHandle, variantId, wholesalePrice, retailPrice] = line.split(",").map(s => s.trim().replace(/"/g, ''));
      
      if (!productHandle || !wholesalePrice) continue;

      const { error } = await supabase
        .from("wholesale_prices")
        .upsert({
          product_handle: productHandle,
          variant_id: variantId || null,
          wholesale_price: parseFloat(wholesalePrice),
          retail_price: retailPrice ? parseFloat(retailPrice) : null,
        }, {
          onConflict: "product_handle,variant_id"
        });

      if (error) {
        errorCount++;
        console.error("Import error:", error, line);
      } else {
        successCount++;
      }
    }

    toast.success(`Imported ${successCount} prices${errorCount > 0 ? `, ${errorCount} errors` : ""}`);
    fetchPrices();
    setIsImporting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const filteredPrices = prices.filter((p) =>
    p.product_handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number | null) => {
    if (price === null) return "—";
    return `$${price.toFixed(2)}`;
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-forest">F&B Pricing</h2>
          <p className="text-sm text-forest/60">
            Manage wholesale prices for the F&B catalog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVImport}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
          >
            {isImporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Import CSV
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Price
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
          <Input
            placeholder="Search by product handle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <p className="text-sm text-forest/60">{prices.length} total prices</p>
      </div>

      <div className="bg-forest/5 rounded-lg p-4 text-sm text-forest/70">
        <strong>CSV Format:</strong> product_handle, variant_id (optional), wholesale_price, retail_price (optional)
        <br />
        <span className="text-xs">Example: athletic-brewing-run-wild-ipa-6pk, , 7.99, 12.99</span>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-forest/5">
              <TableHead>Product Handle</TableHead>
              <TableHead>Variant ID</TableHead>
              <TableHead className="text-right">Wholesale</TableHead>
              <TableHead className="text-right">Retail</TableHead>
              <TableHead className="text-right">Discount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-forest/50">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No wholesale prices found
                </TableCell>
              </TableRow>
            ) : (
              filteredPrices.map((price) => {
                const discount = price.retail_price && price.retail_price > price.wholesale_price
                  ? ((price.retail_price - price.wholesale_price) / price.retail_price * 100).toFixed(0)
                  : null;
                return (
                  <TableRow key={price.id}>
                    <TableCell className="font-mono text-sm">{price.product_handle}</TableCell>
                    <TableCell className="text-sm text-forest/60">
                      {price.variant_id || "—"}
                    </TableCell>
                    <TableCell className="text-right font-bold text-forest">
                      {formatPrice(price.wholesale_price)}
                    </TableCell>
                    <TableCell className="text-right text-forest/60">
                      {formatPrice(price.retail_price)}
                    </TableCell>
                    <TableCell className="text-right">
                      {discount ? (
                        <span className="text-gold font-medium">{discount}% off</span>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(price)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(price.id)}
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={isAddDialogOpen || !!editingPrice} 
        onOpenChange={() => {
          setIsAddDialogOpen(false);
          setEditingPrice(null);
          resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPrice ? "Edit" : "Add"} Wholesale Price</DialogTitle>
            <DialogDescription>
              Set the F&B catalog price for a product. Use the product handle from Shopify.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="productHandle">Product Handle *</Label>
              <Input
                id="productHandle"
                placeholder="athletic-brewing-run-wild-ipa-6pk"
                value={formProductHandle}
                onChange={(e) => setFormProductHandle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="variantId">Variant ID (optional)</Label>
              <Input
                id="variantId"
                placeholder="gid://shopify/ProductVariant/123456"
                value={formVariantId}
                onChange={(e) => setFormVariantId(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wholesalePrice">Wholesale Price *</Label>
                <Input
                  id="wholesalePrice"
                  type="number"
                  step="0.01"
                  placeholder="7.99"
                  value={formWholesalePrice}
                  onChange={(e) => setFormWholesalePrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retailPrice">Retail Price</Label>
                <Input
                  id="retailPrice"
                  type="number"
                  step="0.01"
                  placeholder="12.99"
                  value={formRetailPrice}
                  onChange={(e) => setFormRetailPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddDialogOpen(false);
                setEditingPrice(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingPrice ? "Update" : "Add"} Price
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
