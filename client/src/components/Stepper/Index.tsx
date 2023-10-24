type StepperOptionsData = {
  title: string;
  value: string;
};
type Props = {
  value: string;
  tabOptions: StepperOptionsData[];
  onTabClick: (tab: string) => void;
};
export default function Stepper({ value, tabOptions, onTabClick }: Props) {
  return (
    <ul className="nav nav-pills nav-fill">
      {tabOptions.map((tab, index) => (
        <li
          className="nav-item"
          key={index}
          onClick={() => onTabClick(tab.value)}
        >
          <a
            className={`nav-link ${
              value == tab.value ? "bg-dark text-white" : "text-muted"
            }`}
            aria-current="page"
            href="#"
          >
            {tab.title}
          </a>
        </li>
      ))}
      {/* <li className="nav-item">
      <a
        className={`nav-link ${
          tab === "overview" ? "bg-dark text-white" : "text-muted"
        }`}
        aria-current="page"
        href="#"
      >
        Overview
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link text-muted" href="#">
        Lessons
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link text-muted" href="#">
        Lesson
      </a>
    </li>
    <li className="nav-item">
      <a
        className="nav-link text-muted"
        href="#"
        tabIndex={-1}
        aria-disabled="true"
      >
        Quiz
      </a>
    </li>
    <li className="nav-item" onClick={() => onTabChange("reviews")}>
      <a
        className={`nav-link ${
          tab === "reviews" ? "bg-dark text-white" : "text-muted"
        }`}
        href="#"
        tabIndex={-1}
        aria-disabled="true"
      >
        Reviews
      </a>
    </li> */}
    </ul>
  );
}
