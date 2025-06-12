import React, { useEffect, useState } from "react";
import { Star, StarOff,StarHalf } from "lucide-react";
import globalApi from "../utils/api/globalApi";
// import { Star, StarHalf } from "lucide-react";


export default function Rating() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedText, setSubmittedText] = useState(null);
  const [error, setError] = useState("");

  const [avgRating,setAvgRating]=useState(0);
  const [totalRating,setTotalRating]=useState(0);

  useEffect(() => {
    const suburl = "/api/v1/user/ratings/get-total-ratings";
    globalApi
      .get(suburl)
      .then((res) => {
        if(res.success){
          // console.log(res)
          setAvgRating(Number(res.data.data.averageRating));
          setTotalRating(Number(res.data.data.totalRatings));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please provide a star rating.");
      return;
    }
    if (!feedback) {
      setError("Please provide a comment.");
      return;
    }
    const suburl = "/api/v1/user/ratings/add-rating";
    const payload = {
      score: rating,
      comment: feedback,
    };

    globalApi
      .post(suburl, payload)
      .then((res) => {
        if (res.success) {
          setSubmittedText(res.data.message);
        } else {
          if (res.error === "Invalid or expired token.") {
            setError("You are not logged in.");
          } else {
            setError(res.error);
          }
        }
        setRating(0)
        setFeedback("")
        setSubmitted(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setError("");
  }, [rating, feedback]);

  return (
    <div className="min-h-screen bg-white px-6 pt-12 flex flex-col items-center">
      {/* App Title or Logo */}
      <div className="mb-6 text-center">
        <div className="text-3xl font-extrabold text-blue-700">Xpenso</div>
        <div className="text-lg text-gray-500 mt-1">
          Your Smart Expense Manager
        </div>
      </div>

      {/* Prompt */}
      <div className="text-xl font-bold text-gray-800 mb-3 text-center">
        How was your experience?
      </div>
      <div className="text-gray-600 mb-8 text-center">
        We'd love your feedback to improve the app and provide a better
        experience.
      </div>

      {/* Star Rating */}
      <div className="flex justify-center gap-3 mb-8">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onClick={() => setRating(val)}
            type="button"
            aria-label={`Rate ${val} star${val > 1 ? "s" : ""}`}
            className="focus:outline-none"
          >
            {val <= rating ? (
              <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            ) : (
              <Star className="w-10 h-10 text-gray-300" />
            )}
          </button>
        ))}
      </div>

      {/* Rating Summary */}
<div className="text-center mb-6">
  <div className="text-lg font-semibold text-gray-700 flex flex-col items-center">
    <div className="mb-1">
      Average Rating: <span className="text-yellow-500">{avgRating}</span>
    </div>
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((val) => {
        const fullStars = Math.floor(avgRating);
        const hasHalfStar = avgRating - fullStars >= 0.5;
        if (val <= fullStars) {
          return <Star key={val} className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
        } else if (val === fullStars + 1 && hasHalfStar) {
          return <StarHalf key={val} className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
        } else {
          return <Star key={val} className="w-6 h-6 text-gray-300" />;
        }
      })}
    </div>
  </div>
  <div className="text-sm text-gray-500 mt-1">
    Based on {totalRating} {totalRating === 1 ? "review" : "reviews"}
  </div>
</div>



      {/* Feedback Input */}
      <form
        className="w-full max-w-xl flex flex-col items-stretch"
        onSubmit={handleSubmit}
      >
        <label
          className="text-base font-semibold text-gray-700 mb-2"
          htmlFor="feedback"
        >
          Your Comments
        </label>
        <textarea
          id="feedback"
          className="bg-gray-100 rounded-xl p-4 text-base h-32 text-gray-800 mb-2 resize-none"
          placeholder="Let us know what you liked or what can be improved..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <button
          className="bg-blue-600 rounded-xl p-4 mt-2 text-white text-lg font-bold"
          type="submit"
        >
          Submit Feedback
        </button>
      </form>

      {/* Confirmation */}
      {submitted && (
        <div className="mt-6 text-green-600 text-center text-base">
          🎉 {submittedText}
        </div>
      )}

      {/* Contact Info */}
      {/* <div className="mt-12 border-t border-gray-200 pt-6 text-center w-full">
        <span className="text-gray-500 text-sm">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@expenso.app"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@xpenso.app
          </a>
        </span>
      </div> */}
    </div>
  );
}
