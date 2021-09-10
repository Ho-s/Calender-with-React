import React, { useEffect, useState } from 'react'
import moment from 'moment'
import * as S from './style'

interface IWeek {
	nowWeek: number
	monthStorage: number
	yearStorage: number
	storage: any
}

const Week = ({ nowWeek, monthStorage, yearStorage, storage }: IWeek) => {
	const m = moment()
	const [time, setTime] = useState(m.format('LT'))
	const [location, setLocation] = useState(m.hours() * 61 + 51 + m.minutes())

	const Generate = () => {
		m.set('year', yearStorage)
		m.set('month', monthStorage)
		m.set('week', nowWeek)
		const week = m.week()
		return (
			<>
				{Array(7)
					.fill(0)
					.map((n, i) => {
						const current = m
							.week(week)
							.startOf('week')
							.add(n + i, 'day')
						const todaySelect =
							m.format('YYYYMMDD') === current.format('YYYYMMDD')
								? 'week-selected'
								: ''
						const isGrayed =
							Number(current.format('MM')) === Number(monthStorage) + 1
								? ''
								: 'week-grayed'
						const sun = i === 0 ? 'SUN' : ''
						const mon = i === 1 ? 'MON' : ''
						const tue = i === 2 ? 'TUE' : ''
						const wed = i === 3 ? 'WED' : ''
						const thu = i === 4 ? 'THU' : ''
						const fri = i === 5 ? 'FRI' : ''
						const sat = i === 6 ? 'SAT' : ''

						const day: any = []
						{
							Array(storage.length).forEach((v, n) => {
								if (storage[n].year === Number(current.year())) {
									if (storage[n].month === Number(current.month() + 1)) {
										if (storage[n].day === Number(current.date())) {
											day.push(storage[n])
										}
									}
								}
							})
						}

						return (
							<div
								style={{
									position: 'relative',
									width: 'calc((100vw - 430px) / 7)',
									float: 'left',
								}}
							>
								<div
									style={{ width: 'calc((100vw - 430px) / 7)', height: '50px' }}
								>
									<S.WeekDay>
										<span>
											{sun}
											{mon}
											{tue}
											{wed}
											{thu}
											{fri}
											{sat}
										</span>
									</S.WeekDay>
									<S.WeekBox className={`${todaySelect} ${isGrayed}`} key={i}>
										<span>{current.format('D')}</span>
									</S.WeekBox>
								</div>
								<div style={{ width: '100%' }}>
									{Array(24)
										.fill(0)
										.map(() => {
											return (
												<div
													style={{
														float: 'left',
														borderBottom: '1px solid #e9e9e9',
														height: '60px',
														width: '100%',
														borderLeft: '1px solid #e9e9e9',
													}}
												></div>
											)
										})}
								</div>
								{Array(day.length)
									.fill(0)
									.map((v, n) => {
										const height: number =
											(Number(day[n].endHours) - Number(day[n].startHours)) *
												61 +
											Number(day[n].endMinutes) -
											Number(day[n].startMinutes)
										const style = {
											position: 'absolute',
											top:
												Number(day[n].startHours) * 61 +
												Number(day[n].startMinutes) +
												48.55,
											right: 0,
											width: '100%',
											height: height,
										} as React.CSSProperties
										const back = {
											backgroundColor: day[n].color,
											opacity: '0.5',
											width: '100%',
											height: '100%',
											float: 'left',
										} as React.CSSProperties
										return (
											<div style={style}>
												<div style={back}></div>
												<div
													style={{
														position: 'relative',
														top: -height,
														fontSize: '15px',
														fontWeight: 600,
														color: 'black',
													}}
												>
													<div
														style={{
															position: 'absolute',
															top: height,
															left: 0,
															backgroundColor: day[n].color,
															height: height,
															width: '10px',
														}}
													></div>
													<div style={{ marginLeft: '10px' }}>
														{day[n].startHours}:{day[n].startMinutes}
													</div>
													<div
														style={{
															width: 'calc(100% - 10px)',
															textOverflow: 'ellipsis',
															overflow: 'hidden',
															whiteSpace: 'nowrap',
															height: '17px',
															marginLeft: '10px',
														}}
													>
														{day[n].title}
													</div>
												</div>
											</div>
										)
									})}
							</div>
						)
					})}
			</>
		)
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setLocation(m.hours() * 61 + 51 + m.minutes())
			setTime(m.format('LT'))
		}, 5000)
		return () => clearInterval(timer)
	}, [])

	return (
		<S.WeekComponent>
			<div style={{ float: 'left' }}>
				<S.WeekLeft>
					<div
						style={{
							float: 'left',
							width: '70px',
							height: '55.55px',
							marginBottom: '45px',
							fontSize: '15px',
							fontWeight: 600,
						}}
					>
						<div style={{ color: 'rgb(47, 72, 218)' }}>
							CW{m.set('week', nowWeek).format('W')}
						</div>
						<div style={{ color: 'black', fontSize: '14px' }}>
							{m.set('month', monthStorage).format('MMMM')}
						</div>
						<div style={{ color: 'red' }}>{yearStorage}</div>
					</div>
					<div>
						{Array(24)
							.fill(0)
							.map((v, i) => {
								return (
									<div
										style={{
											color: 'gray',
											fontWeight: 600,
											textAlign: 'right',
											float: 'left',
											height: '61px',
											width: '100%',
										}}
									>
										{`${i + 1}:00`}
									</div>
								)
							})}
					</div>
				</S.WeekLeft>
				<Generate />
			</div>
			<div
				style={{
					borderBottom: '1px solid red',
					width: '100%',
					position: 'absolute',
					top: `${location}px`,
				}}
			>
				<div style={{ fontWeight: 600, color: 'red', height: '0' }}>{time}</div>
			</div>
		</S.WeekComponent>
	)
}
export default Week
