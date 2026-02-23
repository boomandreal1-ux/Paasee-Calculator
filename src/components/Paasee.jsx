import React, { useState, useEffect } from 'react';

export const Paasee = () => {
  const [income, setIncome] = useState('');
  const [extraDeduction, setExtraDeduction] = useState('');
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    const annualIncome = parseFloat(income) || 0;
    const additionalDeduction = parseFloat(extraDeduction) || 0;

    // 1. หักค่าใช้จ่าย (50% ไม่เกิน 100,000 บาท)
    const expense = Math.min(annualIncome * 0.5, 100000);

    // 2. ค่าลดหย่อนส่วนตัว (60,000 บาท) + ค่าลดหย่อนเพิ่มเติม
    const totalDeduction = 60000 + additionalDeduction;

    // 3. เงินได้สุทธิ
    let netIncome = annualIncome - expense - totalDeduction;
    if (netIncome < 0) netIncome = 0;

    // 4. คำนวณภาษีแบบขั้นบันไดของประเทศไทย
    let tax = 0;
    const taxBrackets = [
      { limit: 150000, rate: 0 },
      { limit: 300000, rate: 0.05 },
      { limit: 500000, rate: 0.10 },
      { limit: 750000, rate: 0.15 },
      { limit: 1000000, rate: 0.20 },
      { limit: 2000000, rate: 0.25 },
      { limit: 5000000, rate: 0.30 },
      { limit: Infinity, rate: 0.35 },
    ];

    let previousLimit = 0;
    for (const bracket of taxBrackets) {
      if (netIncome > previousLimit) {
        const taxableAmountInBracket = Math.min(netIncome, bracket.limit) - previousLimit;
        tax += taxableAmountInBracket * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        break;
      }
    }

    setResult({ netIncome, tax });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center w-full justify-center p-4 md:p-10 font-sans">
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-200">
        
        <div className="flex flex-col md:flex-row">
          {/* ส่วนซ้าย: แบบฟอร์มกรอกข้อมูล */}
          <div className="w-full md:w-1/2 p-8 sm:p-12">
            <h2 className="text-2xl font-black text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
              คำนวณภาษี
            </h2>
            
            <div className="space-y-6">
              <div className="group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                  รายได้รวมต่อปี
                </label>
                <div className="relative">
                  {/* ปรับสี text-black (#000) ที่นี่ */}
                  <input 
                    type="number" 
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0.00"
                    className="w-full py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-blue-600 outline-none transition-all text-2xl font-bold text-black placeholder-gray-300"
                  />
                  <span className="absolute right-0 top-4 text-gray-400 font-bold">฿</span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                  ลดหย่อนเพิ่มเติม
                </label>
                <div className="relative">
                  {/* ปรับสี text-black (#000) ที่นี่ */}
                  <input 
                    type="number" 
                    value={extraDeduction}
                    onChange={(e) => setExtraDeduction(e.target.value)}
                    placeholder="0.00"
                    className="w-full py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-blue-600 outline-none transition-all text-2xl font-bold text-black placeholder-gray-300"
                  />
                  <span className="absolute right-0 top-4 text-gray-400 font-bold">฿</span>
                </div>
              </div>

              <button 
                onClick={calculateTax}
                className="w-full bg-blue-600 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-200 active:scale-95 mt-4"
              >
                คำนวณเงินได้สุทธิ
              </button>
            </div>
          </div>

          {/* ส่วนขวา: แสดงผลลัพธ์ (Responsive: อยู่ล่างใน Mobile / อยู่ขวาใน Desktop) */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8 sm:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
            {result ? (
              <div className="space-y-8 animate-in fade-in duration-700">
                <div>
                  <span className="text-sm font-bold text-gray-400 uppercase block mb-1">เงินได้สุทธิ</span>
                  <div className="text-3xl font-bold text-gray-800">
                    ฿{result.netIncome.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <span className="text-sm font-bold text-blue-600 uppercase block mb-2">ภาษที่ต้องชำระทั้งปี</span>
                  <div className="text-5xl font-black text-black">
                    {result.tax.toLocaleString()}
                  </div>
                  <div className="text-gray-400 font-medium mt-1">บาท (THB)</div>
                </div>

                <div className="text-[10px] text-gray-400 leading-relaxed italic">
                  * อ้างอิงอัตราภาษีเงินได้บุคคลธรรมดา พ.ศ. 2567 <br/>
                  * หักค่าใช้จ่าย 50% (ไม่เกิน 1 แสน) และลดหย่อนส่วนตัว 6 หมื่นแล้ว
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-10 md:py-0">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-gray-400 font-medium">กรอกข้อมูลรายได้<br/>เพื่อเริ่มการคำนวณ</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
