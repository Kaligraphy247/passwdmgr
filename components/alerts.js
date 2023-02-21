import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const x = (
  <FontAwesomeIcon icon={faXmarkCircle} className="pt-1 hover:cursor-pointer" />
);

function closeAlert() {
  let close =
    typeof document !== "undefined" &&
    document.getElementsByClassName("closebtn");
  let info;
  for (info = 0; info < close.length; info++) {
    // close when clicked
    close[info].onclick = function () {
      // get parent of element
      let div = this.parentElement;

      // set the opacity of the div to 0, i.e. transparent
      div.style.opacity = "0";

      // hide the div after the name the same time it takes to fadeout
      setTimeout(function () {
        div.style.display = "none";
      }, 600);
    };
  }
}

export function AlertInfo({ message }) {
  return (
    <div class="alert-info">
      {/* <span class="closebtn float-right" onClick={closeAlert}>
        {x}
      </span> */}
      <p>{message}</p>
    </div>
  );
}

export function AlertSuccess({ message }) {
  return (
    <div class="alert-success">
      <span class="closebtn float-right" onClick={closeAlert}>
        {x}
      </span>
      <p>{message}</p>
    </div>
  );
}

export function AlertError({ message }) {
  return (
    <div class="alert-error">
      <span class="closebtn float-right" onClick={closeAlert}>
        {x}
      </span>
      <p>{message}</p>
    </div>
  );
}

export function AlertWarning({ message }) {
  return (
    <div class="alert-warning">
      <span class="closebtn float-right" onClick={closeAlert}>
        {x}
      </span>
      <p>{message}</p>
    </div>
  );
}
// ? not used at the end.
// AlertWarning.defaultProps = {
//   hiddenState: true,
// };
