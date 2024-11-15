// src/components/Plan/CanvasContainer.jsx
import React, { useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { useDrop } from 'react-dnd';

const CanvasContainer = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [, dropRef] = useDrop(() => ({
        accept: 'bubble',
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            handleDrop(item.course, clientOffset);
        },
    }));

    const handleDrop = useCallback(
        (courseData, clientOffset) => {
            const position = { x: clientOffset.x - 150, y: clientOffset.y - 70 };

            const newNode = {
                id: courseData.id.toString(),
                type: 'default',
                data: { label: courseData.courseName },
                position,
            };

            setNodes((nds) => [...nds, newNode]);
        },
        [setNodes]
    );

    return (
        <div ref={dropRef} style={{ height: '600px', marginTop: '20px', backgroundColor: '#f9f9f9' }}>
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
                <Background color="#aaa" gap={16} />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default CanvasContainer;
