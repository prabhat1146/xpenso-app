import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  IndianRupee,
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
} from "lucide-react";
import globalApi from "../../utils/api/globalApi";
import FullScreenLoader from "../../components/FullScreenLoader";
import Alert from "../../components/Alert";

const AddNew = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    success: true,
    visible: false,
  });

  const showAlert = (msg, isSuccess) => {
    setAlert({ message: msg, success: isSuccess, visible: true });
  };

  const [form, setForm] = useState({
    type: "expense",
    mode: "",
    category: "",
    amount: "",
    notes: "",
  });

  const [categories, setCategories] = useState(null);
  const [paymentModes, setPaymentModes] = useState(null);

  //   useEffect(() => {
  //     setCategories(categoryOptions[form.type]);
  //     setForm((prev) => ({ ...prev, category: categoryOptions[form.type][0] }));
  //   }, [form.type]);

  useEffect(() => {
    const subRul = `/api/v1/user/modes/get-modes`;
    globalApi
      .get(subRul)
      .then((res) => {
        // console.log(res);
        const modeData = res.data?.data;
        const cleanData = modeData.map((d) => ({
          ...d,
          value: d.name,
          name: d.name
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }));

        // console.log(cleanData);

        setPaymentModes(cleanData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((final) => {});
  }, []);

  useEffect(() => {
    const subUrl = `/api/v1/user/categories/get-categories`;
    globalApi
      .get(subUrl)
      .then((res) => {
        const catData = res.data?.data;
        const cleanedCatData = catData.map((d) => ({
          ...d,
          value: d.name,
          name: d.name
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }));

        setCategories(cleanedCatData);

        // console.log(cleanedCatData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const firstCategory = categories?.find((cat) => cat.type === form.type);
    // console.log(firstCategory);
    setForm((prev) => ({ ...prev, category: firstCategory?.id }));
  }, [categories, form.type]);
  useEffect(() => {
    if (paymentModes) {
      setForm((prev) => ({ ...prev, mode: paymentModes[0]?.id }));
    }
  }, [paymentModes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount || Number(form.amount) <= 0)) {
      alert("Please enter a valid amount.");
      return;
    }

    const suburl = `/api/v1/user/transactions/add-transaction`;
    const payload = form;
    // console.log(payload);
    setLoading(true);
    globalApi
      .post(suburl, payload)
      .then((res) => {
        console.log(res)
        console.log(res?.data?.message || res?.error, res.success)
        showAlert(res?.data?.message || res?.error, res.success);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((final) => {
        setLoading(false);
      });
    // onSubmit(form);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      {loading && <FullScreenLoader />}
      <Alert
        message={alert.message}
        success={alert.success}
        visible={alert.visible}
        onClose={() => setAlert((a) => ({ ...a, visible: false }))}
      />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-cyan-600" />
        Add New Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Radio Group */}
        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700">
            Transaction Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                value: "income",
                label: "Income",
                icon: <ArrowDownCircle className="w-5 h-5" />,
              },
              {
                value: "expense",
                label: "Expense",
                icon: <ArrowUpCircle className="w-5 h-5" />,
              },
              {
                value: "transfer",
                label: "Transfer",
                icon: <Repeat className="w-5 h-5" />,
              },
            ]?.map((type) => (
              <label
                key={type.value}
                className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors
                  ${
                    form.type === type.value
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={form.type === type.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-2">
                  {type.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {type.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="w-full border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            {paymentModes?.map((mode) => (
              <option key={mode.value} value={mode.id}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            {categories?.map(
              (cat) =>
                cat.type === form.type && (
                  <option key={cat.value} value={cat.id}>
                    {cat.name}
                  </option>
                )
            )}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-1">
            <IndianRupee className="w-4 h-4" /> Amount (INR)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>

        {/* Notes Input */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-1">
            <FileText className="w-4 h-4" /> Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add transaction details..."
            className="w-full border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
