import React from 'react';
import * as LucideIcons from "lucide-react";
const formateStringView = (str) => {
    return str
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

 
 const formatDateTime = (utc_date) => {
  const dateObj = new Date(utc_date);

  // Get locale and timezone
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get individual parts using formatToParts
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).formatToParts(dateObj);

  // Extract parts
  const extract = (type) => parts.find(p => p.type === type)?.value;

  const day = Number(extract('day'));
  const dayName = extract('weekday');
  const monthName = extract('month');
  const month = new Date(`${monthName} 1, 2020`).getMonth() + 1; // Convert name to number
  const year = Number(extract('year'));
  const time = `${extract('hour')}:${extract('minute')} ${extract('dayPeriod')}`.toUpperCase();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  const fullDate = `${dayName}, ${day} ${monthName} ${year}`;
  const fullDateTime = `${fullDate}, ${time}`;

  return {
    day,
    dayName,
    month,
    monthName,
    year,
    time,
    isLeapYear,
    fullDate,
    fullDateTime,
    locale,
    timeZone
  };
};


function filterCategoryByTimeRange(transactions, range = "all") {
  const now = new Date();
  let fromDate;

  switch (range) {
    case "lastMonth":
      fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;
    case "last3Months":
      fromDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      break;
    case "last6Months":
      fromDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      break;
    case "last1Year":
      fromDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      break;
    case "all":
    default:
      return transactions;
  }

  return transactions.filter((tx) => {
    const txDate = new Date(tx.createdAt); // Assumes ISO string
    return txDate >= fromDate && txDate <= now;
  });
}


function groupByExpenseCategory(transactions) {
  const categoryMap = new Map();

  transactions.forEach((tx) => {
    const type = tx.category?.type;
    if (type !== "expense") return; // Only consider expense

    const categoryName = tx.category?.name || "Unknown";
    const color = tx.category?.color || "#8884d8"; // Default color
    const amount = parseFloat(tx.amount || "0");

    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, {
        name: categoryName,
        value: 0,
        color,
      });
    }

    const entry = categoryMap.get(categoryName);
    entry.value += amount;
    categoryMap.set(categoryName, entry);
  });

  return Array.from(categoryMap.values());
}


const LucideIcon = ({ name, ...props }) => {
  const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <Icon {...props} />;
};


const FunUtils = () => {
    return (
        <div>
            
        </div>
    );
}
export { LucideIcon, filterCategoryByTimeRange, groupByExpenseCategory, formateStringView,formatDateTime}
export default FunUtils;
