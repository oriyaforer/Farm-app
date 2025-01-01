import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ShoppingCart, DollarSign, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// קומפוננטת מכירות
const SalesComponent = ({ onSaleComplete }) => {
  const [saleType, setSaleType] = useState('direct');
  const [cart, setCart] = useState({});

  const products = {
    direct: [
      { name: 'תות שדה', price: 20, specialOffer: { quantity: 2, price: 35 } },
      { name: 'מלפפון', price: 10 },
      { name: 'חסה', price: 10 },
      { name: 'סלרי', price: 10 },
      { name: 'פטרוזיליה', price: 10 },
      { name: 'כוסברה', price: 10 },
      { name: 'שמיר', price: 10 },
    ],
    selfPick: {
      entryFee: 35,
      boxPrice: 15,
      products: [
        { name: 'תות שדה', price: 0 },
        { name: 'מלפפון', price: 10 },
        { name: 'חסה', price: 10 },
        { name: 'סלרי', price: 10 },
        { name: 'פטרוזיליה', price: 10 },
        { name: 'כוסברה', price: 10 },
        { name: 'שמיר', price: 10 },
      ]
    }
  };

  const addToCart = (productName) => {
    setCart(prev => ({
      ...prev,
      [productName]: (prev[productName] || 0) + 1
    }));
  };

  const removeFromCart = (productName) => {
    if (!cart[productName]) return;
    setCart(prev => ({
      ...prev,
      [productName]: prev[productName] - 1
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (saleType === 'direct') {
      Object.entries(cart).forEach(([productName, quantity]) => {
        const product = products.direct.find(p => p.name === productName);
        if (product) {
          if (productName === 'תות שדה' && quantity >= 2) {
            const specialOfferPairs = Math.floor(quantity / 2);
            const singleBoxes = quantity % 2;
            total += (specialOfferPairs * 35) + (singleBoxes * 20);
          } else {
            total += product.price * quantity;
          }
        }
      });
    } else {
      if (Object.values(cart).some(q => q > 0)) {
        total += products.selfPick.entryFee;
        total += Object.values(cart).reduce((sum, q) => sum + q, 0) * products.selfPick.boxPrice;
        Object.entries(cart).forEach(([productName, quantity]) => {
          const product = products.selfPick.products.find(p => p.name === productName);
          if (product && product.price > 0) {
            total += product.price * quantity;
          }
        });
      }
    }
    
    return total;
  };

  const completeSale = () => {
    if (Object.values(cart).some(q => q > 0)) {
      onSaleComplete({
        date: new Date(),
        type: saleType,
        items: { ...cart },
        total: calculateTotal()
      });
      setCart({});
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <Button
          variant={saleType === 'direct' ? 'default' : 'outline'}
          onClick={() => setSaleType('direct')}
          className="flex-1"
        >
          <ShoppingCart className="ml-2 h-4 w-4" />
          מכירה ישירה
        </Button>
        <Button
          variant={saleType === 'selfPick' ? 'default' : 'outline'}
          onClick={() => setSaleType('selfPick')}
          className="flex-1"
        >
          <ShoppingCart className="ml-2 h-4 w-4" />
          קטיף עצמי
        </Button>
      </div>

      {saleType === 'selfPick' && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-lg font-bold mb-2">מחירון קטיף עצמי:</p>
            <p>כניסה לשטח ואכילה: ₪{products.selfPick.entryFee}</p>
            <p>מחיר לקופסא: ₪{products.selfPick.boxPrice}</p>
          </CardContent>
        </Card>
      )}

      {(saleType === 'direct' ? products.direct : products.selfPick.products).map(product => (
        <Card key={product.name} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">
                  {product.price > 0 ? `₪${product.price} / יחידה` : 'כלול במחיר הכניסה'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromCart(product.name)}
                  disabled={!cart[product.name]}
                >
                  -
                </Button>
                <span className="w-8 text-center">{cart[product.name] || 0}</span>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => addToCart(product.name)}
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-lg font-bold mb-4">
            <span>סה״כ לתשלום:</span>
            <span>₪{calculateTotal()}</span>
          </div>
          <Button 
            className="w-full"
            onClick={completeSale}
            disabled={!Object.values(cart).some(q => q > 0)}
          >
            סיים מכירה
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// המשך בהודעה הבאה...
