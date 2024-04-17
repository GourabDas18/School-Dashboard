import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
export type lessondata = {
    name:string,
    lesson:number,
    assignment: number,
    duration:number,
    complete:number,
    logo:string
}
export const CourseContainer = ({name,lesson,assignment,duration,complete,logo} : lessondata) => {
    return (
        <div className="bg-[var(--gray)] w-[22rem] h-max flex flex-row items-center p-5 rounded-xl shadow-sm mb-8 xs:flex-wrap xs:justify-center xs:w-fit">
            <div className="flex flex-col gap-5 items-center">
                <div className="h-20 w-20">
                    <CircularProgressbarWithChildren value={complete} maxValue={100} strokeWidth={8} styles={buildStyles({ pathColor: "rgb(95, 187, 109)", trailColor: "rgb(211, 211, 211)" })}>
                        <h2><img src={logo} alt={name} className="h-12 w-12 rounded-full object-cover" /></h2>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="text-2xl font-bold text-gray-500">{complete}%</div>
            </div>
            <div className="px-5 flex flex-col gap-2">
                <div><h2 className="text-sm font-bold">{name}</h2></div>
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-row justify-between p-2">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-1 items-center w-max">
                                <i className="fi fi-sr-massage text-[0.7rem] text-gray-500"></i>
                                <h4 className="text-[0.7rem] text-gray-600">{lesson} Lessons</h4>
                            </div>
                            <div className="flex flex-row gap-1 items-center w-max">
                                <i className="fi fi-bs-football text-[0.7rem] text-gray-500"></i>
                                <h4 className="text-[0.7rem] text-gray-600">{assignment} assignments</h4>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-around p-2">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-1 items-center w-max">
                                <i className="fi fi-sr-time-oclock text-xs text-gray-500"></i>
                                <h4 className="text-[0.7rem] text-gray-600">{duration} Minutes</h4>
                            </div>
                            <div className="flex flex-row gap-1 items-center w-max">
                                <i className="fi fi-ss-users text-xs text-gray-500"></i>
                                <h4 className="text-[0.7rem] text-gray-600">20 Students</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-around p-2">
                <a href="#" className=" border-2 border-green-500 bg-gray-100 text-green-500 text-[0.7rem] font-semibold px-4 py-2 rounded-lg">Change</a>
                <a href="#" className=" border-2 border-green-500 text-gray-100 bg-green-500 text-[0.7rem] font-semibold px-4 py-2 rounded-lg">Assign</a>
                </div>
            </div>

        </div>
    )
}