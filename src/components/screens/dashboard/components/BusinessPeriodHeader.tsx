const BusinessPeriodsHeader = ({ showActions = false }) => (
  <div className="flex items-center justify-center gap-5 pt-10 md:text-base text-[9.19px] font-normal text-[#444444B2]">
    <h3 className="w-[30%] text-center">Day</h3>
    <h3 className="w-[30%] text-center">Open hour</h3>
    <h3 className="w-[30%] text-center">Close hour</h3>
    <h3 className="w-[30%] text-center">Location</h3>
    {showActions && <h3 className="w-[30%] text-center">Action</h3>}
  </div>
);

export default BusinessPeriodsHeader;
