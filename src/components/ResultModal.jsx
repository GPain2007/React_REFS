import { forwardRef, useImperativeHandle, useRef } from "react";

// const ResultModal = forwardRef(function ResultModal({ result, time }, ref) {
// useImperativeHandle(ref);
//   return (
//     <dialog ref={ref} className="result-modal" open>
//       <h2> You {result}</h2>
//       <p>
//         The Target Time was <strong>{time} seconds.</strong>
//       </p>
//       <p>
//         You stopped the timer with <strong>X seconds left. </strong>{" "}
//       </p>
//       <form method="dialog">
//         <button>Close</button>
//       </form>
//     </dialog>
//   );
// });

// export default ResultModal;

export default function ResultModal({ time, ref, timeRemaining, onReset }) {
  const dialog = useRef();

  const userLost = timeRemaining <= 0;

  const formatedTime = timeRemaining / 1000;

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return (
    <dialog ref={dialog} className="result-modal" open>
      {userLost && <h2> You Lost </h2>}
      <p>
        The Target Time was <strong>{time} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formatedTime} seconds left. </strong>{" "}
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
}
