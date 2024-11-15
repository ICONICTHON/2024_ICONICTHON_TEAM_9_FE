import React, { useState, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const semesters = [
    '1학년 1학기',
    '1학년 2학기',
    '2학년 1학기',
    '2학년 2학기',
    '3학년 1학기',
    '3학년 2학기',
    '4학년 1학기',
    '4학년 2학기',
];

const CanvasWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
    padding: 20px;
    overflow-y: auto; /* 필요 시 스크롤 추가 */
`;

const SemesterColumn = styled.div`
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    height: 100%; /* 열의 높이를 전체 Wrapper 높이에 맞춤 */
`;

const CanvasContainer = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [, dropRef] = useDrop(() => ({
        accept: 'bubble',
        drop: (item, monitor) => {
            const courseData = item.course;
            handleDrop(courseData);
        },
    }));

    const layoutGraph = (nodes, edges) => {
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        dagreGraph.setGraph({ rankdir: 'LR' });
        nodes.forEach((node) => dagreGraph.setNode(node.id, { width: 100, height: 50 }));
        edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

        dagre.layout(dagreGraph);

        return nodes.map((node) => {
            const pos = dagreGraph.node(node.id);
            return { ...node, position: { x: pos.x, y: pos.y } };
        });
    };

    const handleDrop = (courseData) => {
        const newNode = {
            id: courseData.id.toString(),
            type: 'default',
            data: { label: courseData.courseName },
            position: { x: 0, y: 0 },
        };

        const newEdges = (courseData.prerequisites || []).map((prereq) => ({
            id: `edge-${prereq.id}-${courseData.id}`,
            source: prereq.id.toString(),
            target: courseData.id.toString(),
        }));

        setNodes((prevNodes) => [...prevNodes, newNode]);
        setEdges((prevEdges) => [...prevEdges, ...newEdges]);

        setNodes((currentNodes) => layoutGraph(currentNodes, edges));
    };

    return (
        <div ref={dropRef}>
            <CanvasWrapper>
                {semesters.map((semester, index) => (
                    <SemesterColumn key={index}>{semester}</SemesterColumn>
                ))}
            </CanvasWrapper>
            <div style={{ height: '800px', width: '100%' }}>
                {' '}
                {/* ReactFlow 전체 영역 크기 확장 */}
                <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
                    <Background color="#aaa" gap={16} />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
};

export default CanvasContainer;
