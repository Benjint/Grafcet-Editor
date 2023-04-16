import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function VerticalLine({x, y, uuid, erase}) {
	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   width={BLOCKSIZE * 3}
			   height={BLOCKSIZE * 2}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x, y + BLOCKSIZE, x + BLOCKSIZE * 3, y + BLOCKSIZE]}
				lineCap={"square"} />
			<Rect
				x={x}
				y={y}
				width={BLOCKSIZE * 3}
				height={BLOCKSIZE * 2}
				id={uuid}
				onClick={e => erase(e)} />
		</Group>
	)
}