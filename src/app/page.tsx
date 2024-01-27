"use client";

import {useState} from "react";

import data from "../data.json";

enum TypeStars {
  EMPTYSTAR = "☆",
  FULLSTAR = "★",
}

interface Question {
  id: number;
  text: string;
}

interface Answer extends Question {
  rating: 1 | 2 | 3 | 4 | 5;
}

const questions: Question[] = data.questions;

function Rating({
  value,
  readOnly,
  onChange,
}: {
  value: number;
  readOnly?: boolean;
  onChange?: (value: Answer["rating"]) => void;
}) {
  const [hoverValue, setHoverValue] = useState(value);

  return (
    <div className="flex gap-3" onMouseLeave={() => setHoverValue(value)}>
      {TypeStars.FULLSTAR.repeat(hoverValue)
        .padEnd(5, TypeStars.EMPTYSTAR)
        .split("")
        .map((star, index) => (
          <button
            key={crypto.randomUUID()}
            className={`${!readOnly ? "cursor-pointer" : ""} text-3xl text-yellow-500`}
            disabled={readOnly}
            type="button"
            onClick={() => onChange?.((index + 1) as Answer["rating"])}
            onMouseEnter={() => setHoverValue(index + 1)}
          >
            {star}
          </button>
        ))}
    </div>
  );
}

export default function Home() {
  const [answer, setAnswer] = useState<Answer[]>([]);
  const currentQuestion = questions[answer.length];
  const hanldeRating = (rating: Answer["rating"]) => {
    setAnswer((answer) =>
      answer.concat({id: currentQuestion.id, text: currentQuestion.text, rating}),
    );
  };

  if (answer.length === questions.length)
    return (
      <ul className="mt-20 flex flex-col items-center gap-5">
        {answer.map((item) => (
          <li key={item.id} className="flex w-full items-center justify-between gap-10">
            <p className="text-xl font-semibold">{item.text}</p>
            <span>→</span>
            <Rating readOnly value={item.rating} />
          </li>
        ))}
      </ul>
    );

  return (
    <article className="flex flex-col items-center justify-center gap-2">
      <h1 className="mt-24 text-xl font-semibold">{currentQuestion.text}</h1>
      <Rating value={2} onChange={hanldeRating} />
    </article>
  );
}
