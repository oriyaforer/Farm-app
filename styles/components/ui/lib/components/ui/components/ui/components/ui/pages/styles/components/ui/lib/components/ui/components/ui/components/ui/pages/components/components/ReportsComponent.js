import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsComponent = ({ sales, expenses }) => {
  const [reportType, setReportType] = useState('daily');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const generateReport = () => {
      const today = new Date();
      const filteredData = {
        sales: sales.filter(sale => {
          const saleDate = new Date(sale.date);
          switch (reportType) {
            case 'daily':
              return saleDate.toDateString() === today.toDateString();
            case 'weekly':
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              return saleDate >= weekAgo;
            case 'monthly':
              return saleDate.getMonth() === today.getMonth() &&
                     saleDate.getFullYear() === today.getFullYear();
            default:
              return true;
          }
        }),
        expenses: expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          switch (reportType) {
            case 'daily':
              return expenseDate.toDateString() === today.toDateString();
            case 'weekly':
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              return expenseDate >= weekAgo;
            case 'monthly':
              return expenseDate.getMonth() === today.getMonth() &&
                     expenseDate.getFullYear() === today.getFullYear();
            default:
              return true;
          }
        })
      };

      // מחשב סיכומים לפי קטגוריה
      const salesByProduct = {};
      filteredData.sales.forEach(sale => {
        Object.entries(sale.items).forEach(([product, quantity]) => {
          salesByProduct[product] = (salesByProduct[product] || 0) + quantity;
        });
      });

      const expensesByCategory = {};
      filteredData.expenses.forEach(expense => {
        expensesByCategory[expense.category] = (expensesByCategory[expense.category] || 0) + expense.amount;
      });

      // מכין את הנתונים לגרף
      setReportData([
        { 
          name: 'הכנסות', 
          total: filteredData.sales.reduce((sum, sale) => sum + sale.total, 0),
          details: salesByProduct
        },
        { 
          name: 'הוצאות', 
          total: filteredData.expenses.reduce((sum, expense) => sum + expense.amount, 0),
          details: expensesByCategory
        }
      ]);
    };

    generateReport();
  }, [reportType, sales, expenses]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>דוחות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded-md"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="daily">דוח יומי</option>
              <option value="weekly">דוח שבועי</option>
              <option value="monthly">דוח חודשי</option>
            </select>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* פירוט נוסף */}
          <div className="mt-4 space-y-4">
            {reportData.map((item) => (
              <div key={item.name} className="border-t pt-4">
                <h3 className="font-bold mb-2">{item.name} - פירוט:</h3>
                {Object.entries(item.details || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span>{key}</span>
                    <span>{item.name === 'הכנסות' ? `${value} יחידות` : `₪${value}`}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsComponent;
