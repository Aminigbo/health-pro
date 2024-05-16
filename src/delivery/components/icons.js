import Svg, { Rect, Path, G, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../utils/colors"
const Colors = Color()
export function HistoryIcon({
    state
}) {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={41}
            fill="none"
        >
            <Rect
                width={40}
                height={40}
                y={2}
                fill={state > 5 ? "#D4F7E7" : "#EB7AA9"}
                fillOpacity={0.4}
                rx={25}
            />
            <Path
                stroke="#0E5132"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                x="-5"
                y="-2"
                d="m25 19.389 2.11 3.333L25 26.056l-6.111-3.334 6.11-3.333ZM18.334 28.833v2c0 1.147.204 1.505 1.228 2.027l4.444 2.267c.976.497 1.013.497 1.988 0l4.444-2.267c1.024-.522 1.229-.88 1.229-2.027v-2"
            />
            <Path
                stroke="#0E5132"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                x="-5"
                y="-2"
                d="M27.596 16.79 25 19.136l-2.596-2.348c-.916-.827-1.373-1.241-1.933-1.285-.56-.044-1.073.293-2.1.968l-1.857 1.222c-.997.655-1.495.983-1.513 1.47-.019.487.454.853 1.399 1.585l2.416 1.873-2.416 1.873c-.945.732-1.418 1.098-1.4 1.585.019.487.517.815 1.514 1.47l2.852 1.876c.548.36.821.54 1.12.516.298-.023.543-.244 1.03-.685L25 26.107l2.596 2.348c.916.827 1.373 1.241 1.933 1.285.56.044 1.073-.293 2.1-.968l1.857-1.222c.997-.655 1.495-.983 1.514-1.47.018-.487-.455-.853-1.4-1.585l-2.416-1.873 2.416-1.873c.945-.732 1.418-1.098 1.4-1.585-.019-.487-.517-.815-1.514-1.47l-1.858-1.222c-1.026-.675-1.54-1.012-2.099-.968-.56.044-1.017.458-1.933 1.285Z"
            />
        </Svg>
    </>
}

export function UserIcon() {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={336}
            height={31}
            fill="none"
        >
            <Rect width={31} height={31} x={0.5} fill="#D4F7E7" rx={15.5} />
            <G stroke="#2A353D" strokeWidth={0.93} clipPath="url(#a)">
                <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.638 17.659c-.877.522-3.177 1.588-1.776 2.923.684.652 1.446 1.118 2.404 1.118h5.468c.958 0 1.72-.466 2.404-1.118 1.4-1.335-.899-2.401-1.776-2.923a6.611 6.611 0 0 0-6.724 0Z"
                />
                <Path d="M18.79 12.09a2.79 2.79 0 1 1-5.58 0 2.79 2.79 0 0 1 5.58 0Z" />
            </G>
            <Path
                fill="#000"
                d="m38.439 10.818 3.022 8.571h.12l3.022-8.57h1.293L42.157 21h-1.272l-3.739-10.182h1.293ZM47.323 21v-7.636h1.173V21h-1.173Zm.596-8.91a.834.834 0 0 1-.591-.233.75.75 0 0 1-.244-.561.75.75 0 0 1 .244-.562.834.834 0 0 1 .591-.234c.23 0 .425.078.587.234a.744.744 0 0 1 .249.562.744.744 0 0 1-.249.561.817.817 0 0 1-.587.234Zm5.828 9.07c-.715 0-1.332-.17-1.849-.508a3.305 3.305 0 0 1-1.193-1.397c-.279-.593-.418-1.271-.418-2.033 0-.776.143-1.46.428-2.054a3.378 3.378 0 0 1 1.203-1.397c.517-.338 1.12-.507 1.81-.507.536 0 1.02.1 1.451.299.431.198.784.477 1.06.835.274.358.445.775.511 1.253h-1.173c-.09-.348-.288-.657-.597-.925-.304-.272-.715-.408-1.233-.408-.457 0-.858.12-1.203.358-.341.236-.608.569-.8 1-.189.427-.283.93-.283 1.506 0 .59.092 1.104.278 1.541.189.438.454.777.795 1.02.345.241.75.362 1.213.362.305 0 .582-.053.83-.159.25-.106.46-.259.632-.457.172-.2.295-.438.368-.716h1.173c-.066.45-.23.857-.492 1.218a2.75 2.75 0 0 1-1.029.855c-.424.209-.918.313-1.482.313Zm8.04-7.796v.994h-3.958v-.994h3.957Zm-2.804-1.83h1.173v7.278c0 .332.048.58.144.746.1.163.225.272.378.328.156.053.32.08.492.08.13 0 .235-.007.318-.02l.2-.04.238 1.054c-.08.03-.19.06-.333.09a2.45 2.45 0 0 1-.542.05c-.332 0-.657-.072-.975-.214a1.938 1.938 0 0 1-.785-.652c-.206-.291-.308-.66-.308-1.103v-7.597Zm7.589 9.625c-.69 0-1.295-.164-1.815-.492a3.345 3.345 0 0 1-1.213-1.377c-.288-.59-.433-1.28-.433-2.068 0-.796.145-1.49.433-2.084a3.338 3.338 0 0 1 1.213-1.382c.52-.328 1.125-.492 1.815-.492.689 0 1.292.164 1.81.492.52.329.924.79 1.212 1.383.292.593.438 1.287.438 2.083 0 .788-.146 1.478-.438 2.068a3.298 3.298 0 0 1-1.213 1.377c-.517.328-1.12.492-1.81.492Zm0-1.054c.523 0 .954-.134 1.292-.403.338-.268.589-.621.751-1.059.162-.437.244-.911.244-1.421s-.082-.986-.244-1.427a2.405 2.405 0 0 0-.75-1.07c-.339-.27-.77-.407-1.293-.407-.524 0-.955.136-1.293.408a2.405 2.405 0 0 0-.75 1.069c-.163.44-.244.916-.244 1.427 0 .51.08.984.243 1.421.163.438.413.79.751 1.06.338.268.769.402 1.293.402Zm5.25.895v-7.636h1.134v1.153h.08c.14-.378.391-.684.756-.92a2.225 2.225 0 0 1 1.233-.353c.086 0 .194.002.323.005.129.004.227.009.293.015v1.193a3.45 3.45 0 0 0-.273-.044 2.69 2.69 0 0 0-.443-.035c-.371 0-.703.078-.994.233a1.714 1.714 0 0 0-.935 1.556V21h-1.173Zm9.724 0h-1.293l3.74-10.182h1.272L89.004 21H87.71l-3.043-8.571h-.08L81.547 21Zm.477-3.977h5.21v1.093h-5.21v-1.093Zm9.262 4.056a.862.862 0 0 1-.631-.263.862.862 0 0 1-.263-.631c0-.246.087-.456.263-.632a.861.861 0 0 1 .631-.263c.246 0 .456.088.632.263a.861.861 0 0 1 .263.632.927.927 0 0 1-.447.776.853.853 0 0 1-.448.118Z"
            />
            <Path
                stroke="#2A353D"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M315.278 15.442c-.948-1.653-1.406-3.002-1.682-4.37-.408-2.024.526-4.001 2.073-5.263.654-.533 1.404-.35 1.791.343l.873 1.567c.692 1.242 1.038 1.862.97 2.52-.069.659-.536 1.195-1.469 2.267l-2.556 2.936Zm0 0c1.919 3.346 4.93 6.36 8.28 8.28m0 0c1.653.948 3.003 1.406 4.371 1.682 2.023.408 4-.526 5.262-2.073.533-.654.35-1.404-.343-1.791l-1.567-.873c-1.242-.692-1.862-1.038-2.521-.97-.658.069-1.194.536-2.266 1.469l-2.936 2.556Z"
            />
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M8.56 8.06h14.88v14.88H8.56z" />
                </ClipPath>
            </Defs>
        </Svg>
    </>
}

export function PhoneIcon() {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            fill="none"
        >
            <Path
                stroke="#2A353D"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.278 12.442C3.33 10.79 2.872 9.44 2.596 8.072c-.408-2.024.526-4.001 2.073-5.263.654-.533 1.404-.35 1.791.343l.873 1.567c.692 1.242 1.038 1.862.97 2.52-.069.659-.536 1.195-1.469 2.267l-2.556 2.936Zm0 0c1.919 3.346 4.93 6.36 8.28 8.28m0 0c1.653.948 3.002 1.406 4.37 1.682 2.024.408 4.001-.526 5.262-2.073.534-.654.351-1.404-.342-1.791l-1.567-.873c-1.242-.692-1.862-1.038-2.52-.97-.659.069-1.195.536-2.267 1.469l-2.936 2.556Z"
            />
        </Svg>
    </>
}

export function CheckFullIcon({
    status
}) {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <G strokeWidth={1.5} clipPath="url(#a)">
                <Path
                    fill={status == true ? Colors.primary : "lightgrey"}
                    stroke={status == true ? Colors.primary : "lightgrey"}
                    d="M22 11c0-5.523-4.477-10-10-10S2 5.477 2 11s4.477 10 10 10 10-4.477 10-10Z"
                />
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 11.75s1.6.912 2.4 2.25c0 0 2.4-5.25 5.6-7"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    </>
}

export function CheckOutlineIcon() {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <G stroke="#0E5132" strokeWidth={1.5} clipPath="url(#a)">
                <Path d="M22 11c0-5.523-4.477-10-10-10S2 5.477 2 11s4.477 10 10 10 10-4.477 10-10Z" />
                <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 11.75s1.6.912 2.4 2.25c0 0 2.4-5.25 5.6-7"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    </>
}

export function PhoneIcon2() {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={23}
            fill="none"
        >
            <Path
                stroke="#2A353D"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.278 11.442C2.33 9.79 1.872 8.44 1.596 7.072c-.408-2.024.526-4.001 2.073-5.263.654-.533 1.404-.35 1.791.343l.873 1.567c.692 1.242 1.038 1.862.97 2.52-.069.659-.536 1.195-1.469 2.267l-2.556 2.936Zm0 0c1.919 3.346 4.93 6.36 8.28 8.28m0 0c1.653.948 3.002 1.406 4.37 1.682 2.024.408 4.001-.526 5.262-2.073.534-.654.351-1.404-.342-1.791l-1.567-.873c-1.242-.692-1.862-1.038-2.52-.97-.659.069-1.195.536-2.267 1.469l-2.936 2.556Z"
            />
        </Svg>
    </>
}

export function UserIcon2() {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={31}
            fill="none"
        >
            <Rect width={31} height={31} x={0.5} fill={Colors.primary} rx={15.5} />
            <G stroke="#fff" strokeWidth={0.93} clipPath="url(#a)">
                <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.638 17.659c-.877.522-3.177 1.588-1.776 2.923.684.652 1.446 1.118 2.404 1.118h5.468c.958 0 1.72-.466 2.404-1.118 1.4-1.335-.899-2.401-1.776-2.923a6.611 6.611 0 0 0-6.724 0Z"
                />
                <Path d="M18.79 12.09a2.79 2.79 0 1 1-5.58 0 2.79 2.79 0 0 1 5.58 0Z" />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M8.56 8.06h14.88v14.88H8.56z" />
                </ClipPath>
            </Defs>
        </Svg>
    </>
}

export function RefreshIcon() {
    return <>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <Path
                fill="#777"
                d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.707 6.707 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 1 0-18 0Z"
            />
        </Svg>
    </>
}