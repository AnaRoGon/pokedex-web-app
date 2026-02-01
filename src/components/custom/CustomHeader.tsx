interface Props {
  logotype?: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export const CustomHeader = ({
  logotype,
  title,
  subtitle,
  color = "",
}: Props) => {
  const definedStyle =
    "text-sm md:text-lg lg:text-xl m-10 font-medium" + " " + color;
  return (
    <div>
      <h1 className="flex flex-col items-center text-4xl md:text-5xl lg:text-7xl font-extrabold bg-linear-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mt-25">
        {title}
        {logotype !== undefined && (
          <div className="p-5 object-scale-down">
            <img
              alt="logo"
              src={logotype}
              height="40"
              className="mr-2 object-scale-down mt-5"
            ></img>
          </div>
        )}
      </h1>
      {subtitle && <h2 className={definedStyle}>{subtitle}</h2>}
    </div>
  );
};
