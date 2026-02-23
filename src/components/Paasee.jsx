import { useState } from 'react';

export const Paasee = () => {
  const [monthlySalary, setMonthlySalary] = useState('');
  const [annualBonus, setAnnualBonus] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');

  // Core Calculation Logic
  const calculateTaxDetails = () => {
    const salary = Number(monthlySalary) || 0;
    const bonus = Number(annualBonus) || 0;
    const allowances = Number(otherAllowances) || 0;
    
    const totalAnnualIncome = (salary * 12) + bonus;

    // Standard Expense Deduction (50% of income, capped at 100,000 THB)
    const standardExpenseDeduction = Math.min(totalAnnualIncome * 0.5, 100000);

    // Personal Allowance (Fixed at 60,000 THB)
    const personalAllowance = 60000;

    // Net Taxable Income
    let netTaxableIncome = totalAnnualIncome - standardExpenseDeduction - personalAllowance - allowances;
    if (netTaxableIncome < 0) netTaxableIncome = 0;

    // Progressive Tax Calculation (Top-Down Approach)
    let taxPayable = 0;
    let remainingIncome = netTaxableIncome;

    if (remainingIncome > 5000000) { taxPayable += (remainingIncome - 5000000) * 0.35; remainingIncome = 5000000; }
    if (remainingIncome > 2000000) { taxPayable += (remainingIncome - 2000000) * 0.30; remainingIncome = 2000000; }
    if (remainingIncome > 1000000) { taxPayable += (remainingIncome - 1000000) * 0.25; remainingIncome = 1000000; }
    if (remainingIncome > 750000)  { taxPayable += (remainingIncome - 750000) * 0.20;  remainingIncome = 750000; }
    if (remainingIncome > 500000)  { taxPayable += (remainingIncome - 500000) * 0.15;  remainingIncome = 500000; }
    if (remainingIncome > 300000)  { taxPayable += (remainingIncome - 300000) * 0.10;  remainingIncome = 300000; }
    if (remainingIncome > 150000)  { taxPayable += (remainingIncome - 150000) * 0.05;  remainingIncome = 150000; }

    return {
      totalAnnualIncome,
      standardExpenseDeduction,
      personalAllowance,
      netTaxableIncome,
      taxPayable
    };
  };

  const details = calculateTaxDetails();

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl font-sans text-slate-800 border border-slate-200">
      
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          🧮Paasee Calculator
        </h2>
        <p className="text-slate-500 text-sm">
          ประเมินภาษีเบื้องต้นของคุณง่ายๆ เพียงกรอกรายได้และค่าลดหย่อน
        </p>
      </div>
      
      {/* Input Section */}
      <div className="space-y-5 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">เงินเดือน (บาท)</label>
          <input 
            type="number" 
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            placeholder="เช่น 50000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">โบนัสประจำปี (บาท)</label>
          <input 
            type="number" 
            value={annualBonus}
            onChange={(e) => setAnnualBonus(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            placeholder="เช่น 100000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">ค่าลดหย่อนอื่นๆ (บาท)</label>
          <p className="text-xs text-slate-500 mb-2">เช่น ประกันสังคม, กองทุนสำรองเลี้ยงชีพ, ประกันชีวิต, SSF/RMF</p>
          <input 
            type="number" 
            value={otherAllowances}
            onChange={(e) => setOtherAllowances(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            placeholder="เช่น 20000"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl space-y-3 border border-indigo-100 shadow-inner">
        <h3 className="text-lg font-bold text-indigo-900 mb-4 border-b border-indigo-200 pb-2">สรุปการคำนวณภาษี</h3>
        
        <div className="flex justify-between text-sm">
          <span className="text-slate-700">รายได้รวมทั้งปี:</span>
          <span className="font-semibold">{details.totalAnnualIncome.toLocaleString()} บาท</span>
        </div>
        
        <div className="flex justify-between text-sm text-slate-600">
          <span>หักค่าใช้จ่าย (50% สูงสุด 100,000 บาท):</span>
          <span className="text-red-500">- {details.standardExpenseDeduction.toLocaleString()} บาท</span>
        </div>

        <div className="flex justify-between text-sm text-slate-600">
          <span>หักค่าลดหย่อนส่วนตัว:</span>
          <span className="text-red-500">- {details.personalAllowance.toLocaleString()} บาท</span>
        </div>

        <div className="flex justify-between text-sm font-semibold pt-3 border-t border-indigo-200 mt-2">
          <span className="text-slate-800">เงินได้สุทธิที่นำไปคำนวณภาษี:</span>
          <span className="text-indigo-700">{details.netTaxableIncome.toLocaleString()} บาท</span>
        </div>

        <div className="flex justify-between items-center text-lg font-bold pt-4 mt-2 border-t border-indigo-200">
          <span className="text-slate-800">ภาษีที่คาดว่าจะต้องจ่าย:</span>
          <span className="text-2xl text-red-600 bg-white px-4 py-1 rounded-lg shadow-sm border border-red-100">
            {details.taxPayable.toLocaleString()} บาท
          </span>
        </div>
      </div>
    </div>
  );
};