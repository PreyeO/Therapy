import SetupHeader from "../SetupHeader";

const ReviewStep = () => {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="text-center">
        <SetupHeader
          title="Review your pratice details"
          subtitle="You can always update this information later. "
        />
      </div>
      <div className="border flex flex-col gap-5 py-7 rounded-xl px-6">
        <div className="flex justify-between text-lg font-normal ">
          <h4 className="text-[#041827B2]">Pratice Name:</h4>
          <p className=" ">Dr.Preye</p>
        </div>

        <div className="flex justify-between text-lg font-normal">
          <h4 className="text-[#041827B2]">Business Address:</h4>
          <p>Unit 1 Brixton Angel Road, London SE1 3HE</p>
        </div>

        <div className="flex justify-between text-lg font-normal">
          <h4 className="text-[#041827B2]">Location:</h4>
          <p>Angel Road, London SE1 3H</p>
        </div>

        <div className="flex justify-between text-lg font-normal">
          <h4 className="text-[#041827B2]">Services:</h4>
          <p>Psychtherapy ,45mins $20 per Hour</p>
        </div>

        <div className="">
          <div className="flex justify-between text-lg font-normal items-center">
            <h4 className="text-[#041827B2]">Availability:</h4>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p>Mon</p>
                <p>10:00Am</p>
                <p>-</p>
                <p>4:00Pm</p>
              </div>
              <div className="flex gap-2">
                <p>Mon</p>
                <p>10:00Am</p>
                <p>-</p>
                <p>4:00Pm</p>
              </div>
              <div className="flex gap-2">
                <p>Mon</p>
                <p>10:00Am</p>
                <p>-</p>
                <p>4:00Pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
