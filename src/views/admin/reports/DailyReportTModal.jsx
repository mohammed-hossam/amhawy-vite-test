import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import DailyReportTForm from './dailyReportTForm';
import styles from './reports.module.css';

function DailyReportTModal({ dailyReportModalOpen, dailyReportToggle }) {
  //   const [dailyReportModalOpen, setDailyReportModalOpen] = useState(false);

  //   const dailyReportToggle = () =>
  //     setDailyReportModalOpen(!dailyReportModalOpen);

  return (
    <Modal
      isOpen={dailyReportModalOpen}
      toggle={dailyReportToggle}
      fade={false}
    >
      <ModalHeader toggle={dailyReportToggle} className={styles.closeIcon}>
        التقرير اليومي
      </ModalHeader>
      <ModalBody>
        <DailyReportTForm />
      </ModalBody>
    </Modal>
  );
}

export default DailyReportTModal;
