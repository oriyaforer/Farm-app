import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, DollarSign, PieChart } from 'lucide-react';
import SalesComponent from '@/components/SalesComponent';
import ExpensesComponent from '@/components/ExpensesComponent';
import ReportsComponent from '@/components/ReportsComponent';

export default function Home() {
  // טעינת נתונים מ-localStorage בהתחלה
  const [sales, setSales] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSales = localStorage.getItem('farmSales');
      return savedSales ? JSON.parse(savedSales) : [];
    }
    return [];
  });

  const [expenses, setExpenses] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedExpenses = localStorage.getItem('farmExpenses');
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    }
    return [];
  });

  // שמירת נתונים ב-localStorage בכל שינוי
  useEffect(() => {
    localStorage.setItem('farmSales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('farmExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleSaleComplete = (saleData) => {
    setSales(prev => [...prev, saleData]);
  };

  const handleExpenseAdd = (expenseData) => {
    setExpenses(prev => [...prev, expenseData]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>ניהול משק חקלאי</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sales" className="space-y-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="sales">
                <ShoppingCart className="ml-2 h-4 w-4" />
                מכירות
              </TabsTrigger>
              <TabsTrigger value="expenses">
                <DollarSign className="ml-2 h-4 w-4" />
                הוצאות
              </TabsTrigger>
              <TabsTrigger value="reports">
                <PieChart className="ml-2 h-4 w-4" />
                דוחות
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sales">
              <SalesComponent onSaleComplete={handleSaleComplete} />
            </TabsContent>

            <TabsContent value="expenses">
              <ExpensesComponent onExpenseAdd={handleExpenseAdd} />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsComponent sales={sales} expenses={expenses} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
