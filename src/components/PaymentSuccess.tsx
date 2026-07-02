import React from 'react';
import { CheckCircle, Mail, Download, ArrowRight, FileText } from 'lucide-react';

interface PaymentSuccessProps {
  confirmationId?: string;
  customerEmail?: string;
  amountPaid?: number;
  orderId?: string;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  confirmationId = "TXN-849204X71",
  customerEmail = "customer@example.com",
  amountPaid = 1200,
  orderId = "AM-ORD-9921"
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 antialiased">
      {/* Main Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-6 md:p-8 transform transition-all">
        
        {/* Animated Checkmark Wrapper */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10" fill="currentColor" stroke="white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="text-sm text-slate-500 mt-1">Thank you for your business.</p>
        </div>

        {/* Email Notification Alert Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 mb-6">
          <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Confirmation Sent</h3>
            <p className="text-xs text-blue-700 mt-0.5">
              A copy of this digital receipt and order summary has been emailed to <span className="font-semibold">{customerEmail}</span>.
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100 mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 text-xs font-medium text-slate-400 tracking-wider uppercase">
            <span>Payment Summary</span>
            <span className="text-slate-900 font-bold lowercase normal-case flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> {orderId}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Amount Paid</span>
            <span className="font-semibold text-slate-900">₹{amountPaid.toLocaleString('en-IN')}.00</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Confirmation ID</span>
            <span className="font-mono font-medium text-slate-700 select-all bg-slate-200/50 px-1.5 py-0.5 rounded text-xs">
              {confirmationId}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Payment Status</span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Settled
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button 
            onClick={() => window.print()} 
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-md text-sm cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download PDF Receipt
          </button>
          
          <a 
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl transition duration-200 border border-slate-200 text-sm"
          >
            Go Back to Homepage <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Having trouble? Contact us at <span className="font-medium text-slate-600">+91 73863 81729</span>
          </p>
        </div>

      </div>
    </div>
  );
};
