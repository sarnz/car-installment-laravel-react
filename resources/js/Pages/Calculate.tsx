import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useMemo, useState, ChangeEvent } from 'react';


type Term = number;

interface InstallmentRow {
    term: Term;
    installment: number;
}

const MIN_TERM = 12;
const MAX_TERM = 84;
const TERM_STEP = 12;
const WARNING_LIMIT = 5000;


export default function Calculate({ auth }: PageProps) {
    const [amount, setAmount] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);


    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        if (value === '') {
            setAmount('');
            return;
        }

        if (!/^\d+$/.test(value)) {
            alert('กรุณากรอกตัวเลขที่ไม่ติดลบเท่านั้น');
            setAmount('');
            return;
        }

        setAmount(value);
    };

    const handleInterestChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        setInterest(e.target.value);
    };

    const handleClear = (): void => {
        setAmount('');
        setInterest('');
        setSelectedTerm(null);
    };

    const calculateInstallment = (term: Term): number => {
        if (!amount || !interest) return 0;

        const principal = Number(amount);
        const rate = Number(interest) / 100;
        const total = principal + principal * rate;

        return Number((total / term).toFixed(2));
    };

    const rows: InstallmentRow[] = useMemo(() => {
        const result: InstallmentRow[] = [];

        for (let term = MIN_TERM; term <= MAX_TERM; term += TERM_STEP) {
            result.push({
                term,
                installment: calculateInstallment(term),
            });
        }

        return result;
    }, [amount, interest]);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    คำนวณยอดผ่อน
                </h2>
            }
        >
            <Head title="Calculate" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow rounded">

                        {/* Input */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block mb-1">
                                    ยอดจัด
                                </label>
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">
                                    ดอกเบี้ย (%)
                                </label>
                                <input
                                    type="number"
                                    value={interest}
                                    onChange={handleInterestChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        {/* Clear Button */}
                        {(amount || interest) && (
                            <button
                                onClick={handleClear}
                                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                เคลียร์ค่า
                            </button>
                        )}

                        {/* Table */}
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2 text-center">
                                        จำนวนงวด
                                    </th>
                                    <th className="border p-2 text-center">
                                        ยอดผ่อน / เดือน
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(({ term, installment }) => (
                                    <tr
                                        key={term}
                                        onClick={() =>
                                            setSelectedTerm(term)
                                        }
                                        className={`cursor-pointer ${
                                            selectedTerm === term
                                                ? 'bg-yellow-200'
                                                : ''
                                        }`}
                                    >
                                        <td className="border p-2 text-center">
                                            {term}
                                        </td>
                                        <td
                                            className={`border p-2 text-center ${
                                                installment > WARNING_LIMIT
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                        >
                                            {installment}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
