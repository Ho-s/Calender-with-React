import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useReactiveVar } from '@apollo/client'

import Day from '../../molcules/Day/Day'
import Week from '../../molcules/Week/Week'
import Month from '../../molcules/Month/Month'
import Year from '../../molcules/Year/Year'

import {
	nowDay,
	nowWeek,
	monthStorage,
	yearStorage,
	onClickToday,
} from '../../../stores/store'

import * as S from './style'

const MainCalendar: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const m = moment()
	const [dayCheck, setDayCheck] = useState<boolean>(true)
	const [weekCheck, setWeekCheck] = useState<boolean>(false)
	const [monthCheck, setMonthCheck] = useState<boolean>(false)
	const [yearCheck, setYearCheck] = useState<boolean>(false)
	const [timeDetail, setTimeDetail] = useState<string>(m.format('HH:mm:ss'))
	const [location, setLocation] = useState<number>(m.hours() * 61 + m.minutes())
	const [lineTime, setLineTime] = useState<string>(m.format('LT'))

	useEffect(()=>{
		const timer = setInterval(()=>{
			setTimeDetail(' ' + m.format('HH:mm:ss') + ' ')
			setLineTime(m.format('LT'))
			setLocation(m.hours() * 61 + m.minutes())
		}, 1000)
		return () => clearInterval(timer)
	},[timeDetail])

	const onClickDayButton = () => {
		setDayCheck(true)
		setWeekCheck(false)
		setMonthCheck(false)
		setYearCheck(false)
	}

	const onClickWeekButton = () => {
		setDayCheck(false)
		setWeekCheck(true)
		setMonthCheck(false)
		setYearCheck(false)
	}

	const onClickMonthButton = () => {
		setDayCheck(false)
		setWeekCheck(false)
		setMonthCheck(true)
		setYearCheck(false)
	}

	const onClickYearButton = () => {
		setDayCheck(false)
		setWeekCheck(false)
		setMonthCheck(false)
		setYearCheck(true)
	}

	const onClickTodayButton = () => {
		onClickDayButton()
		onClickToday()
	}

	const Generate = () => {
		const todayStyle =
			dayCheck &&
			Number(nowDayProps) === m.date() &&
			Number(nowWeekProps) === m.week() &&
			monthStorageProps === m.month() &&
			yearStorageProps === m.year()
				? 'clicked'
				: ''
		return (
			<>
				<S.TodayButton onClick={onClickTodayButton} className={todayStyle}>
					Today
				</S.TodayButton>
				<S.MainCalendarHeadMid>
					<S.HeadSpan
						onClick={onClickDayButton}
						className={dayCheck ? 'clicked' : ''}
					>
						Day
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickWeekButton}
						className={weekCheck ? 'clicked' : ''}
					>
						Week
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickMonthButton}
						className={monthCheck ? 'clicked' : ''}
					>
						Month
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickYearButton}
						className={yearCheck ? 'clicked' : ''}
					>
						Year
					</S.HeadSpan>
				</S.MainCalendarHeadMid>
				<S.Time>{timeDetail}</S.Time>
			</>
		)
	}

	return (
		<S.MainCalendar>
			<S.MainCalendarHead>
				<Generate />
			</S.MainCalendarHead>
			{dayCheck && <Day location={location} lineTime={lineTime}/>}
			{weekCheck && <Week location={location} lineTime={lineTime}/>}
			{monthCheck && <Month />}
			{yearCheck && <Year />}
		</S.MainCalendar>
	)
}
export default MainCalendar
