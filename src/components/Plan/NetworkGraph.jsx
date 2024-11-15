// src/components/Plan/NetworkGraph.js
import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

const NetworkGraph = ({ courses }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const nodes = courses.map((course) => ({
            id: course.id,
            label: course.courseName,
            color: course.subjectArea === '전필' ? 'red' : 'blue', // 전필 과목은 빨간색
        }));

        const edges = courses.flatMap((course) =>
            course.prerequisites
                ? course.prerequisites.map((prereq) => ({
                      from: prereq.id,
                      to: course.id,
                  }))
                : []
        );

        const data = { nodes, edges };
        const options = {
            layout: {
                hierarchical: {
                    direction: 'LR',
                    sortMethod: 'directed',
                },
            },
            physics: false,
        };

        new Network(containerRef.current, data, options);
    }, [courses]);

    return <div ref={containerRef} style={{ height: '600px', width: '100%' }} />;
};

export default NetworkGraph;
