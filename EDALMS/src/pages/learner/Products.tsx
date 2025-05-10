
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Products</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
          <CardDescription>Browse and purchase products</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The products catalog will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
