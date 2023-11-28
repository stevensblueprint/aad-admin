import classNames from "classnames";

interface HeaderProps {
  toggleable?: boolean;
  // add other properties as needed
}

// Customize PrimeReact components
const designSystem = {
  panel: {
    header: ({ props }: { props: HeaderProps }) => ({
      className: classNames(
        "flex items-center justify-between", // flex and alignments
        "border border-gray-300 bg-gray-100 text-gray-700 rounded-tl-lg rounded-tr-lg", // borders and colors
        "dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80", // Dark mode
        { "p-5": !props.toggleable, "py-3 px-5": props.toggleable }, // condition
      ),
    }),
    title: ({ children }: { children: string }) => {
      <span className="font-bold leading-none">{children}</span>;
    },
    toggler: {
      className: classNames(
        "inline-flex items-center justify-center overflow-hidden relative no-underline", // alignments
        "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out", // widths, borders, and transitions
        "hover:text-gray-900 hover:border-transparent hover:bg-gray-200 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]", // hover
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]", // focus
      ),
    },
    content: {
      className: classNames(
        "p-5 border border-gray-300 bg-white text-gray-700 border-t-0 last:rounded-br-lg last:rounded-bl-lg",
        "dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80", // Dark mode
      ),
    },
  },
};

export default designSystem;
