import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import DailyReportTModal from './DailyReportTModal';
import IntersectionReportTModal from './IntersectionReportTModal';
import PurchasesReportForm from './PurchasesReportForm';
import PurchasesReportFormEng from './PurchasesReportFormEng';
import styles from './reports.module.css';
import SellerReportForm from './SellerReportForm';

function Reports() {
  const [dailyReportModalOpen, setDailyReportModalOpen] = useState(false);
  const [sellerReportModalOpen, setSellerReportModalOpen] = useState(false);
  const [purchasesReportModalOpen, setPurchasesReportModalOpen] =
    useState(false);
  const [purchasesEngReportModalOpen, setPurchasesEngReportModalOpen] =
    useState(false);

  const dailyReportToggle = () => {
    setDailyReportModalOpen(!dailyReportModalOpen);
  };

  const sellerReportToggle = () =>
    setSellerReportModalOpen(!sellerReportModalOpen);
  const purchasesReportToggle = () =>
    setPurchasesReportModalOpen(!purchasesReportModalOpen);
  const purchasesEngReportToggle = () =>
    setPurchasesEngReportModalOpen(!purchasesReportModalOpen);

  const [intersectionReportModalOpen, setIntersectionReportModalOpen] =
    useState(false);
  const intersectionReportToggle = () =>
    setIntersectionReportModalOpen(!intersectionReportModalOpen);

  // function dailyReportHandleSearch() {}
  // function intersectionReportHandleSearch() {}

  return (
    <div className="content text-right">
      <button
        className={styles.report_btn}
        onClick={dailyReportToggle}
        style={{
          marginBottom: '0.2em',
          padding: '0.8em',
          display: 'block',
          minWidth: '13.5em',
        }}
      >
        اصدار التقرير اليومي
      </button>
      <button
        className={styles.report_btn}
        onClick={intersectionReportToggle}
        style={{
          marginBottom: '0.2em',
          padding: '0.8em',
          display: 'block',
          minWidth: '13.5em',
          marginTop: '1em',
        }}
      >
        اصدار تقرير التقاطعات
      </button>

      {/* DailyReportTForm */}
      <DailyReportTModal
        dailyReportModalOpen={dailyReportModalOpen}
        dailyReportToggle={dailyReportToggle}
      />

      {/*  IntersectionReportTForm */}
      <IntersectionReportTModal
        intersectionReportModalOpen={intersectionReportModalOpen}
        intersectionReportToggle={intersectionReportToggle}
      />

      <button
        className={styles.report_btn}
        onClick={sellerReportToggle}
        style={{
          marginBottom: '0.2em',
          padding: '0.8em',
          display: 'block',
          minWidth: '13.5em',
          marginTop: '1em',
        }}
      >
        اصدار تقرير البائعين
      </button>

      <Modal
        isOpen={sellerReportModalOpen}
        toggle={sellerReportToggle}
        fade={false}
      >
        <ModalHeader toggle={sellerReportToggle} className={styles.closeIcon}>
          اصدار تقرير البائعين
        </ModalHeader>
        <ModalBody>
          <SellerReportForm />
        </ModalBody>
      </Modal>

      {/* ------------------ */}

      <button
        className={styles.report_btn}
        onClick={purchasesReportToggle}
        style={{
          marginBottom: '0.2em',
          padding: '0.8em',
          display: 'block',
          minWidth: '13.5em',
          marginTop: '1em',
        }}
      >
        اصدار تقرير المشترين
      </button>

      <Modal
        isOpen={purchasesReportModalOpen}
        toggle={purchasesReportToggle}
        fade={false}
      >
        <ModalHeader
          toggle={purchasesReportToggle}
          className={styles.closeIcon}
        >
          <p className={styles.modalTitle}>اصدار تقرير المشتريات</p>
        </ModalHeader>
        <ModalBody>
          <PurchasesReportForm />
        </ModalBody>
      </Modal>
      {/* ------------------ */}

      <button
        className={styles.report_btn}
        onClick={purchasesEngReportToggle}
        style={{
          marginBottom: '0.2em',
          padding: '0.8em',
          display: 'block',
          minWidth: '13.5em',
          marginTop: '1em',
        }}
      >
        اصدار تقرير المشترين الاجانب
      </button>

      <Modal
        isOpen={purchasesEngReportModalOpen}
        toggle={purchasesEngReportToggle}
        fade={false}
      >
        <ModalHeader
          toggle={purchasesEngReportToggle}
          className={styles.closeIcon}
        >
          <p className={styles.modalTitle}>اصدار تقرير المشترين الاجانب</p>
        </ModalHeader>
        <ModalBody>
          <PurchasesReportFormEng />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Reports;
