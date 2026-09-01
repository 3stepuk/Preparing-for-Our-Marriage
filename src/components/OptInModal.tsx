import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { PARISH_INFO } from '../data/courseData';
import { Church, X, Send, ShieldCheck, Check, AlertCircle, Loader2 } from 'lucide-react';

interface OptInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OptInModal: React.FC<OptInModalProps> = ({ isOpen, onClose }) => {
  const { profile, sendOptInNotification } = useCourse();

  const [formData, setFormData] = useState({
    name: profile.partner1Name || '',
    partnerName: profile.partner2Name || '',
    email: profile.optInEmail || '',
    weddingDate: profile.weddingDate || '',
    church: profile.church || "St Mary's | St John Bosco | St Edward's Parish",
    priestMentor: profile.priestMentor || 'Fr. John',
    sponsorMentor: profile.sponsorMentor || '',
    message: '',
  });

  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorMsg('Please enter your email address so Father John can acknowledge.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const result = await sendOptInNotification(formData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } else {
      setErrorMsg(result.error || 'Failed to submit. Please check your internet connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161616] border-t-2 border-[#B85D42] border-x border-b border-white/10 rounded max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded hover:bg-[#1C1C1C] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#B85D42] font-semibold text-[10px] uppercase tracking-[0.2em]">
            <Church className="w-3.5 h-3.5" />
            <span>Parish Pastoral Care</span>
          </div>
          <h2 className="text-2xl font-serif text-slate-100 font-normal">
            Notify Father John
          </h2>
          <p className="text-xs text-slate-400 font-serif">
            Optional sign-in to let your parish clergy know you have started the preparation module.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded bg-[#1C261F] border border-[#274632] text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif text-slate-100">
              Notification Sent
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto font-serif">
              Father John has been notified that you are working through your preparation. May God
              bless your journey!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-[#2A1715] border border-[#5E2B23] rounded flex items-center gap-2 text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-serif text-slate-300 mb-1 text-[11px]">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Michael"
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
                />
              </div>

              <div>
                <label className="block font-serif text-slate-300 mb-1 text-[11px]">Partner's Name</label>
                <input
                  type="text"
                  required
                  value={formData.partnerName}
                  onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                  placeholder="e.g. Sarah"
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
                />
              </div>
            </div>

            <div>
              <label className="block font-serif text-slate-300 mb-1 text-[11px]">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="couple@example.com"
                className="w-full bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-serif text-slate-300 mb-1 text-[11px]">Wedding Date</label>
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
                />
              </div>

              <div>
                <label className="block font-serif text-slate-300 mb-1 text-[11px]">Priest / Mentor</label>
                <input
                  type="text"
                  value={formData.priestMentor}
                  onChange={(e) => setFormData({ ...formData, priestMentor: e.target.value })}
                  placeholder="Fr. John"
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
                />
              </div>
            </div>

            <div>
              <label className="block font-serif text-slate-300 mb-1 text-[11px]">Sponsor / Mentor</label>
              <input
                type="text"
                value={formData.sponsorMentor}
                onChange={(e) => setFormData({ ...formData, sponsorMentor: e.target.value })}
                placeholder="e.g. David & Mary (Parish sponsors)"
                className="w-full bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
              />
            </div>

            <div>
              <label className="block font-serif text-slate-300 mb-1 text-[11px]">
                Optional Note to Father John
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e.g. We have started Conversation 1 and look forward to our next meeting..."
                className="w-full bg-[#0F0F0F] border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#B85D42] font-serif"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="pt-1 flex items-start gap-2.5 text-[11px] text-slate-400 font-serif">
              <input
                type="checkbox"
                id="optin-consent"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-white/20 bg-[#0F0F0F] text-[#B85D42] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="optin-consent" className="cursor-pointer">
                I agree to send this registration notice to Father John (`xvkoozdo`). All other
                notes & answers remain strictly private on this device.
              </label>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded text-[10px] uppercase tracking-wider font-semibold text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !agreed}
                className="px-6 py-2.5 bg-[#B85D42] hover:bg-[#8F3F2A] text-white font-semibold rounded text-[10px] uppercase tracking-wider flex items-center gap-2 disabled:opacity-50 shadow-md cursor-pointer transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Father John</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
