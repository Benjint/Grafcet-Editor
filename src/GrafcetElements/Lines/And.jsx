import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function And({x, y, uuid, erase}) {
	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   width={BLOCKSIZE * 6}
			   height={BLOCKSIZE}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x, y, x + BLOCKSIZE * 6, y]}
				lineCap={"square"} />

			<Line
				stroke="black"
				strokeWidth={4}
				points={[x, y + 10, x + BLOCKSIZE * 6, y + 10]}
				lineCap={"square"} />
			<Rect
				x={x}
				y={y}
				width={BLOCKSIZE * 6}
				height={BLOCKSIZE}
				id={uuid}
				onClick={e => erase(e)} />
		</Group>
	)
}