import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import OverviewDashboard from './pages/OverviewDashboard';
import AuditStudio from './pages/AuditStudio';
import BrandGuidelinesVault from './pages/BrandGuidelinesVault';
import ApprovalCenter from './pages/ApprovalCenter';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AuditTrailView from './pages/AuditTrailView';
import SettingsView from './pages/SettingsView';
import LoginView from './pages/LoginView';

export default function App() {
  return (
    <Routes>
      {/* Auth Route */}
      <Route path="/login" element={<LoginView />} />

      {/* Main SaaS Platform Application Layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<OverviewDashboard />} />
        <Route path="overview" element={<OverviewDashboard />} />
        <Route path="audit" element={<AuditStudio />} />
        <Route path="guidelines" element={<BrandGuidelinesVault />} />
        <Route path="approvals" element={<ApprovalCenter />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="audit-trail" element={<AuditTrailView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
