import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

const Posts = lazy(() => import('../pages/Posts'));
const Post = lazy(() => import('../pages/Post'));

interface Props {
    message: string;
    componentName?: string;
}

export const Content: React.FC<Props> = ({ message, componentName = Content.displayName }) => {

    useEffect(() => {
        console.log(`${message} ${componentName}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="content">
            <Router>
                <Suspense fallback={<div className="loader" />}>
                    <Routes>
                        <Route path="/posts" element={<Posts message={message} />} />
                        <Route path="/posts/:id" element={<Post message={message} />} />
                        <Route path="/" element={<Navigate to="/posts" replace />} />
                        <Route path="*" element={<Navigate to="/posts" replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </main>
    );
}

Content.displayName = "Content";
export default Content
