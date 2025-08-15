import React, { useEffect, useMemo, useState } from "react";

/**
 * TermsConsentModal
 * - Accessible modal for collecting terms/consent.
 * - No external UI libs required (Tailwind only).
 *
 * Props
 *   open: boolean
 *   onClose: () => void
 *   onConfirm: (consents) => void  // { tos, privacy, marketing, push }
 *
 * Example usage inside your page:
 *   const [open, setOpen] = useState(isNewUser);
 *   const handleConfirm = (consents) => {
 *     setOpen(false);
 *     // save consents if needed, then allow nickname submission
 *   };
 *   <TermsConsentModal open={open} onClose={() => setOpen(false)} onConfirm={handleConfirm} />
 */
export default function TermsConsentModal({ open, onClose, onConfirm }) {
  const [checks, setChecks] = useState({
    tos: false,
    privacy: false,
    marketing: false,
    push: false,
  });
  const [expanded, setExpanded] = useState(
    /** @type {null | keyof typeof sampleDocs} */ (null)
  );

  const requiredOK = useMemo(() => checks.tos && checks.privacy, [checks]);
  const allChecked = useMemo(
    () => Object.values(checks).every(Boolean),
    [checks]
  );

  useEffect(() => {
    if (!open) {
      // reset expanded panel when closing
      setExpanded(null);
    }
  }, [open]);

  const toggleAll = () => {
    const next = !allChecked;
    setChecks({ tos: next, privacy: next, marketing: next, push: next });
  };

  const toggle = (key) => setChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="이용약관 동의"
        className="relative mx-4 w-full max-w-xl rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
            이용약관 동의
          </h2>
          {/* <button
            onClick={onClose}
            aria-label="닫기"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button> */}
        </div>

        {/* Body */}
        <div className="px-5 pb-4 pt-3">
          {/* Agree all */}
          <label className="flex items-center gap-3 rounded-xl border p-3">
            <input
              type="checkbox"
              className="h-5 w-5 accent-brand"
              checked={allChecked}
              onChange={toggleAll}
            />
            <span className="font-semibold text-gray-900">전체 동의</span>
            <span className="ml-auto text-sm text-gray-500">
              (선택 항목 포함)
            </span>
          </label>

          {/* Items */}
          <ul className="mt-3 space-y-2">
            <TermRow
              required
              label="서비스 이용약관 동의"
              checked={checks.tos}
              onChange={() => toggle("tos")}
              expanded={expanded === "tos"}
              onToggleExpand={() =>
                setExpanded((p) => (p === "tos" ? null : "tos"))
              }
              docKey="tos"
            />
            <TermRow
              required
              label="개인정보 처리방침 동의"
              checked={checks.privacy}
              onChange={() => toggle("privacy")}
              expanded={expanded === "privacy"}
              onToggleExpand={() =>
                setExpanded((p) => (p === "privacy" ? null : "privacy"))
              }
              docKey="privacy"
            />
            <TermRow
              label="마케팅 정보 수신 동의 (이메일/SMS)"
              checked={checks.marketing}
              onChange={() => toggle("marketing")}
              expanded={expanded === "marketing"}
              onToggleExpand={() =>
                setExpanded((p) => (p === "marketing" ? null : "marketing"))
              }
              docKey="marketing"
            />
            <TermRow
              label="푸시 알림 수신 동의"
              checked={checks.push}
              onChange={() => toggle("push")}
              expanded={expanded === "push"}
              onToggleExpand={() =>
                setExpanded((p) => (p === "push" ? null : "push"))
              }
              docKey="push"
            />
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t px-5 py-3">
          {/* <button
            onClick={onClose}
            className="h-11 rounded-xl px-4 text-gray-700 hover:bg-gray-100"
          >
            취소
          </button> */}
          <button
            onClick={() => onConfirm?.(checks)}
            disabled={!requiredOK}
            className="h-11 rounded-xl px-4 font-semibold text-white bg-brand disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brandDark"
          >
            동의하고 계속
          </button>
        </div>
      </div>
    </div>
  );
}

function TermRow({
  required = false,
  label,
  checked,
  onChange,
  expanded,
  onToggleExpand,
  docKey,
}) {
  return (
    <li className="rounded-xl border">
      <div className="flex items-center gap-3 p-3">
        <input
          id={`chk-${docKey}`}
          type="checkbox"
          className="h-5 w-5 accent-brand"
          checked={checked}
          onChange={onChange}
        />
        <label
          htmlFor={`chk-${docKey}`}
          className="cursor-pointer text-gray-900"
        >
          {label} {required && <span className="ml-1 text-brand">(필수)</span>}
        </label>
        <button
          type="button"
          onClick={onToggleExpand}
          className="ml-auto text-sm text-brand hover:underline"
        >
          {expanded ? "닫기" : "보기"}
        </button>
      </div>

      {/* Expandable doc */}
      {expanded && (
        <div className="max-h-52 overflow-auto border-t bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
          {sampleDocs[docKey]}
        </div>
      )}
    </li>
  );
}

// ─── Sample documents (replace with your real content or fetch) ──────────────
const sampleDocs = {
  tos: `제1조 (목적) 이 약관은 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n제2조 (정의) ...\n제3조 (약관의 효력과 변경) ...\n제4조 (회원의 의무) ...\n제5조 (서비스의 제공, 변경, 중단) ...`,
  privacy: `수집 항목: 이메일, 닉네임, 서비스 이용 기록 등\n수집 목적: 회원 식별, 서비스 제공 및 고객 지원\n보유 및 이용 기간: 관계 법령에 따른 기간 동안 보관 후 파기\n처리 위탁 및 제3자 제공: (해당 시 고지) ...\n이용자는 동의를 거부할 권리가 있으며, 거부 시 서비스 이용이 제한될 수 있습니다.`,
  marketing: `이메일, 문자 등을 통해 이벤트/혜택 정보를 받아볼 수 있습니다.\n수신 동의 철회는 설정에서 언제든 가능합니다.`,
  push: `앱/웹 브라우저 푸시 알림으로 주문 상태, 공지, 추천 콘텐츠 등을 받아볼 수 있습니다.\n브라우저 또는 앱 설정에서 알림을 끌 수 있습니다.`,
};
