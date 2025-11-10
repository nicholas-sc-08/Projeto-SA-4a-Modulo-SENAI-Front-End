"use client";

import React from "react";
import styles from "@/app/dashboard/page.module.css";
import Sidebar from "@/components/sidebar_brecho/Siderbar";
import { Bell } from "lucide-react";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className={styles.dashboardContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.dateBox}></div>
          <div className={styles.userInfo}></div>
        </div>

        {/* Grid geral */}
        <div className={styles.mainGrid}>
          {/* Lado esquerdo */}
          <div className={styles.leftContent}>
            <div className={styles.topCards}>
              <div className={styles.card}></div>
              <div className={styles.card}></div>
            </div>
            <div className={styles.bigGraph}></div>
          </div>

          {/* Lado direito */}
          <div className={styles.rightPanel}>
            {/* === Fatura === */}
            <div className={styles.invoiceWrapper}>
              {/* Box esquerda */}
              <div className={styles.invoiceLeft}>
                <div className={styles.invoiceTop}>
                  <h4>Fatura</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.chartIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>

                <div className={styles.invoiceValue}>R$ 3.0000</div>

                <div className={styles.invoiceTabs}>
                  <button className={styles.tab}>Quinzenal</button>
                  <button className={`${styles.tab} ${styles.activeTab}`}>Mensal</button>
                  <button className={styles.tab}>Semanal</button>
                </div>
              </div>

              {/* Box direita */}
              <div className={styles.statusPanel}>
                <div className={styles.statusRow}>
                  <div className={styles.statusItem}>
                    <p className={styles.statusLabel}>Concluídos</p>
                    <p className={styles.statusValue}>17</p>
                  </div>
                  <div className={styles.statusItem}>
                    <p className={styles.statusLabel}>Pendentes</p>
                    <p className={styles.statusValue}>8</p>
                  </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.statusItemSingle}>
                  <p className={styles.statusLabel}>Devoluções</p>
                  <p className={styles.statusValue}>2</p>
                </div>
              </div>
            </div>


            {/* === Calendário === */}
            <div className={styles.calendarBox}>
              <div className={styles.calendarHeader}>
                <h3 className={styles.calendarTitle}>
                  Acompanhar calendário
                  <span className={styles.tooltipWrapper}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.helpIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12" y2="17" />
                    </svg>
                    <span className={styles.tooltipText}>
                      Aqui você pode acompanhar os pedidos da semana.
                    </span>
                  </span>
                </h3>

                <div className={styles.calendarControls}>
                  <button className={styles.arrowButton}>‹</button>
                  <button className={styles.arrowButton}>›</button>
                  <button className={styles.monthButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.calendarIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Agosto
                  </button>
                </div>
              </div>

              <div className={styles.daysRow}>
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map((dia, index) => (
                  <div
                    key={index}
                    className={`${styles.dayItem} ${index === 1 ? styles.activeDay : ""
                      }`}
                  >
                    <span className={styles.dayName}>{dia}</span>
                    <span className={styles.dayNumber}>{11 + index}</span>
                  </div>
                ))}
              </div>

              <div className={styles.cardsRow}>
                <div className={styles.dayCard}></div>
                <div className={styles.dayCard}></div>
                <div className={styles.dayCard}></div>
              </div>

              <div className={styles.pagination}>
                <span></span>
                <span className={styles.activeDot}></span>
                <span></span>
              </div>
            </div>


            {/* Pagamento */}
            <div className={styles.paymentBox}>
              <h3>Pagamento</h3>
              <div className={styles.cardContainer}>
                {/* Imagem do cartão */}
                <img
                  src="/img/icons/cartaoAdd.svg"
                  alt="Adicionar Cartão"
                  className={styles.creditCard}
                />

                <div className={styles.actionButtons}>
                  <div className={styles.addButton}></div>
                  <div className={styles.deleteButton}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
