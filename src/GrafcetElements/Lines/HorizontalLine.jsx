import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function VerticalLine({x, y, uuid, erase, values, setValues}) {
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
			   width={BLOCKSIZE * 3}
			   height={BLOCKSIZE * 2}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[0, BLOCKSIZE, BLOCKSIZE * 3, BLOCKSIZE]}
				lineCap={"square"} />
			<Rect
				width={BLOCKSIZE * 3}
				height={BLOCKSIZE * 2}
				id={uuid}
				onClick={e => erase(e)} />
		</Group>
	)
}