import React from 'react'
import { useReactiveVar } from '@apollo/client'
import moment from 'moment'

import BaseTemplate from '../BaseTemplate/BaseTemplate'

import {
	nowDay,
	nowWeek,
	monthStorage,
	yearStorage,
	whatDay,
	storage,
	onClickDelete,
} from '../../stores/store'

import * as S from './style'
import StorageType from 'types/type'

interface dayProps {
	location: number
	lineTime: string
}

const Day: React.FunctionComponent<dayProps> = ({location, lineTime}) => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const whatDayProps = useReactiveVar(whatDay)
	const storageProps = useReactiveVar(storage)

	const m = moment()

	const TimeLinesLeft = Array(24)
		.fill(0)
		.map((_, i) => {
			return (
				<S.TimeLineLeft key={i}>
					{i < 9 ? `0${i + 1}:00` : `${i + 1}:00`}
				</S.TimeLineLeft>
			)
		})

	const TimeLinesRight = () => {
		m.set('year', yearStorageProps)
		m.set('month', monthStorageProps)
		m.set('week', nowWeekProps)
		m.set('date', nowDayProps)
		return (
			<>
				<S.TimeLineRightWrapper>
					{Array(24)
						.fill(0)
						.map((_, i) => (
							<S.TimeLineRight key={i} />
						))}
				</S.TimeLineRightWrapper>
			</>
		)
	}

	const TakeSchedule = () => {
		const day: StorageType[] = []
		storageProps.forEach((v: StorageType) => {
			if (v.year === Number(yearStorageProps)) {
				if (v.month === Number(monthStorageProps + 1)) {
					if (v.day === Number(nowDayProps)) {
						day.push(v)
					}
				}
			}
		})
		return (
			<>
				{day.map((v: StorageType) => {
					const height =
						(Number(v.endHours) - Number(v.startHours)) * 61 +
						Number(v.endMinutes) -
						Number(v.startMinutes)
					return (
						<S.ScheduleWrapper
							key={v.id}
							top={Number(v.startHours) * 61 + Number(v.startMinutes)}
							height={height}
						>
							<S.ScheduleBack backgroundColor={v.color} />
							<S.ScheduleTextWrapper top={-height}>
								<S.ScheduleColor backgroundColor={v.color} height={height} />
								<S.ScheduleText>
									{v.startHours}:{v.startMinutes} ~ {v.endHours}:{v.endMinutes}
								</S.ScheduleText>
								<S.ScheduleText>{v.title}</S.ScheduleText>
							</S.ScheduleTextWrapper>
						</S.ScheduleWrapper>
					)
				})}
			</>
		)
	}

	return (
		<BaseTemplate>
			<S.DateStorage>
				<S.WeekStorage>
				CW{nowWeekProps}
				</S.WeekStorage>
				<S.TodayStorage>
					{whatDayProps === -1
						? m.set('date', nowDayProps).format('dddd')
						: m.day(whatDayProps).format('dddd')}
				</S.TodayStorage>
				<S.MonthStorage>
					{`${m.set('month', monthStorageProps).format('MMMM')}${nowDayProps}`}
				</S.MonthStorage>
				<S.YearStorage>{yearStorageProps}</S.YearStorage>
			</S.DateStorage>
			<S.TimeTable>
				<S.RedLine top={`${location}px`}>{lineTime}</S.RedLine>
				<TakeSchedule />
				<S.DayLeft>{TimeLinesLeft}</S.DayLeft>
				<TimeLinesRight />
			</S.TimeTable>
		</BaseTemplate>
	)
}
export default Day
