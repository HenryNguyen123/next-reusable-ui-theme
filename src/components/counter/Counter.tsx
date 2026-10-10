"use client";

import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "@/lib/features/counter/counterSlice";
import { Button } from "@/components/ui";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";

export default function Counter() {
  const count = useAppSelector(
    (state) => state.counter.value
  );

  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-3">
      <Button size='md'
        onClick={() => dispatch(decrement())}
        className="rounded border px-4 py-2"
      >
        -
      </Button>

      <span className="min-w-8 text-center font-semibold">
        {count}
      </span>

      <Button
        onClick={() => dispatch(increment())}
        className="rounded border px-4 py-2"
      >
        +
      </Button>

      <Button
        onClick={() => dispatch(incrementByAmount(5))}
        className="rounded border px-3 py-2"
      >
        +5
      </Button>

      <Button
        onClick={() => dispatch(reset())}
        className="rounded border px-3 py-2"
      >
        Reset
      </Button>
    </div>
  );
}