import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ExpensesComponent = ({ onExpenseAdd }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().slice(0, 10)
  });

  const expenseCategories = [
    { id: 'water', name: 'מים' },
    { id: 'fertilizer', name: 'דישון' },
    { id: 'workers', name: 'עובדים' },
    { id: 'equipment', name: 'ציוד' },
    { id: 'technician', name: 'שירות טכנאי' },
    { id: 'other', name: 'אחר' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.category && expense.amount) {
      onExpenseAdd({
        ...expense,
        amount: parseFloat(expense.amount),
        date: new Date(expense.date)
      });
      setExpense({
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().slice(0, 10)
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>הוספת הוצאה חדשה</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              className="w-full p-2 border rounded-md"
              value={expense.category}
              onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            >
              <option value="">בחר קטגוריה</option>
              {expenseCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <Input
              type="number"
              placeholder="סכום"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="תיאור"
              value={expense.description}
              onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            />
          </div>

          <div>
            <Input
              type="date"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            הוסף הוצאה
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpensesComponent;
