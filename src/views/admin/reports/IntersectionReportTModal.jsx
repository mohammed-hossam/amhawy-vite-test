import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntersectionReportTForm from './intersectionReportTForm';
import styles from './reports.module.css';

function IntersectionReportTModal({
  intersectionReportModalOpen,
  intersectionReportToggle,
}) {
  return (
    <Modal
      isOpen={intersectionReportModalOpen}
      toggle={intersectionReportToggle}
      fade={false}
    >
      <ModalHeader
        toggle={intersectionReportToggle}
        className={styles.closeIcon}
      >
        تقرير التقاطعات
      </ModalHeader>
      <ModalBody>
        <IntersectionReportTForm />
      </ModalBody>
    </Modal>
  );
}

export default IntersectionReportTModal;
