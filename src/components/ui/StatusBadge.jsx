import { STATUS_COLORS } from "../../utils/constants";
import { classNames } from "../../utils/helpers";

export const StatusBadge = ({ status }) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;

  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
        colors.bg,
        colors.text,
      )}
    >
      <span className={classNames("w-1.5 h-1.5 rounded-full", colors.dot)} />
      {status?.replace("_", " ").toUpperCase()}
    </span>
  );
};
