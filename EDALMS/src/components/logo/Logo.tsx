
const Logo = ({ collapsed = false }: { collapsed?: boolean }) => {
  return (
    <div className="flex items-center">
      <div className="relative w-8 h-8 mr-2">
        <div className="absolute top-0 left-0 w-6 h-6 bg-[#00A99D] rounded-sm transform rotate-45 translate-x-1 translate-y-1"></div>
        <div className="absolute top-0 left-0 w-6 h-6 bg-[#5B7BB9] rounded-sm transform -translate-x-1 -translate-y-1 opacity-70"></div>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-none text-white">EDATHENA</span>
          <span className="text-xs tracking-wider text-white/70">ACADEMY</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
