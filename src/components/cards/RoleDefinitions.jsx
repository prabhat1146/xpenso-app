import React from "react";
import { UserMinus, UserPlus } from "lucide-react";

const RoleDefinitions = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Role Definitions</h2>

      {/* Borrower Definition */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-100 rounded-full">
          <UserMinus className="text-red-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-700">Borrower</h3>
          <p className="text-gray-600">
            A <span className="font-medium">Borrower</span> is an individual or entity that receives funds, goods, or services 
            from another party with the agreement to repay the value, usually with or without interest, 
            within a specified period. Borrowers assume the responsibility of repayment as per agreed terms.
          </p>
        </div>
      </div>

      {/* Lender Definition */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-green-100 rounded-full">
          <UserPlus className="text-green-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-700">Lender</h3>
          <p className="text-gray-600">
            A <span className="font-medium">Lender</span> is an individual, financial institution, or entity that provides 
            funds, goods, or services to a borrower with the expectation of repayment, often with interest 
            or additional terms. Lenders bear the credit risk but gain returns in exchange for extending credit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleDefinitions;
