import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function HorizontalLine({x, y, uuid, erase, values, setValues}) {
	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
		let index = values.findIndex(element => element.id === uuid)
		values[index].x = props.x()
		values[index].y = props.y()
		setValues(values)
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   x={x}
			   y={y}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 3}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[BLOCKSIZE, 0, BLOCKSIZE, BLOCKSIZE * 3]}
				lineCap={"square"} />
			<Rect
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 3}
				id={uuid}
				onClick={e => erase(e)} />
		</Group>
	)
}