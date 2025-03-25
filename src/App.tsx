import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, History } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setDisplay(prev => prev + op);
  };

  const handleScientific = (func: string) => {
    try {
      let result: number;
      const currentNum = parseFloat(display);

      switch (func) {
        case 'sin':
          result = Math.sin(currentNum * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(currentNum * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(currentNum * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(currentNum);
          break;
        case 'ln':
          result = Math.log(currentNum);
          break;
        case 'sqrt':
          result = Math.sqrt(currentNum);
          break;
        case 'square':
          result = Math.pow(currentNum, 2);
          break;
        case 'cube':
          result = Math.pow(currentNum, 3);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          return;
      }

      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
      setHistory(prev => [...prev, `${func}(${display}) = ${formattedResult}`]);
      setDisplay(formattedResult);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const calculate = () => {
    try {
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(expression).toString();
      setHistory(prev => [...prev, `${display} = ${result}`]);
      setDisplay(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  const deleteLastChar = () => {
    setDisplay(prev => prev.length === 1 ? '0' : prev.slice(0, -1));
  };

  const Button = ({ children, onClick, className = '' }: { 
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-medium rounded-xl transition-all hover:bg-opacity-90 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Display */}
          <div className="p-6 bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <History size={20} />
                </button>
                <span className="text-gray-400 text-sm">Scientific Calculator</span>
              </div>
            </div>
            <div className="h-20 flex items-end justify-end">
              <span className="text-4xl font-light text-white break-all text-right">
                {display}
              </span>
            </div>
          </div>

          {/* History Panel */}
          {showHistory && (
            <div className="bg-gray-850 border-t border-gray-700 p-4">
              <div className="max-h-32 overflow-y-auto">
                {history.map((item, index) => (
                  <div key={index} className="text-gray-400 text-sm py-1">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex">
            {/* Scientific Panel */}
            <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 border-r border-gray-700">
              <Button onClick={() => handleScientific('sin')} className="bg-gray-700 text-white text-sm">
                sin
              </Button>
              <Button onClick={() => handleScientific('cos')} className="bg-gray-700 text-white text-sm">
                cos
              </Button>
              <Button onClick={() => handleScientific('tan')} className="bg-gray-700 text-white text-sm">
                tan
              </Button>
              <Button onClick={() => handleScientific('log')} className="bg-gray-700 text-white text-sm">
                log
              </Button>
              <Button onClick={() => handleScientific('ln')} className="bg-gray-700 text-white text-sm">
                ln
              </Button>
              <Button onClick={() => handleScientific('sqrt')} className="bg-gray-700 text-white text-sm">
                √
              </Button>
              <Button onClick={() => handleScientific('square')} className="bg-gray-700 text-white text-sm">
                x²
              </Button>
              <Button onClick={() => handleScientific('cube')} className="bg-gray-700 text-white text-sm">
                x³
              </Button>
              <Button onClick={() => handleScientific('pi')} className="bg-gray-700 text-white text-sm">
                π
              </Button>
              <Button onClick={() => handleScientific('e')} className="bg-gray-700 text-white text-sm">
                e
              </Button>
              <Button onClick={() => handleOperator('(')} className="bg-gray-700 text-white text-sm">
                (
              </Button>
              <Button onClick={() => handleOperator(')')} className="bg-gray-700 text-white text-sm">
                )
              </Button>
            </div>

            {/* Main Buttons Grid */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-gray-800">
              <Button onClick={clear} className="bg-red-500 text-white">
                C
              </Button>
              <Button onClick={deleteLastChar} className="bg-gray-700 text-white">
                <Delete size={20} />
              </Button>
              <Button onClick={() => handleOperator('÷')} className="bg-gray-700 text-white">
                <Divide size={20} />
              </Button>
              <Button onClick={() => handleOperator('×')} className="bg-gray-700 text-white">
                <X size={20} />
              </Button>

              {[7, 8, 9].map(num => (
                <Button 
                  key={num} 
                  onClick={() => handleNumber(num.toString())}
                  className="bg-gray-900 text-white"
                >
                  {num}
                </Button>
              ))}
              <Button onClick={() => handleOperator('-')} className="bg-gray-700 text-white">
                <Minus size={20} />
              </Button>

              {[4, 5, 6].map(num => (
                <Button 
                  key={num} 
                  onClick={() => handleNumber(num.toString())}
                  className="bg-gray-900 text-white"
                >
                  {num}
                </Button>
              ))}
              <Button onClick={() => handleOperator('+')} className="bg-gray-700 text-white">
                <Plus size={20} />
              </Button>

              {[1, 2, 3].map(num => (
                <Button 
                  key={num} 
                  onClick={() => handleNumber(num.toString())}
                  className="bg-gray-900 text-white"
                >
                  {num}
                </Button>
              ))}
              <Button onClick={calculate} className="bg-blue-500 text-white row-span-2">
                <Equal size={20} />
              </Button>

              <Button 
                onClick={() => handleNumber('0')} 
                className="bg-gray-900 text-white col-span-2"
              >
                0
              </Button>
              <Button 
                onClick={() => handleNumber('.')} 
                className="bg-gray-900 text-white"
              >
                .
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;