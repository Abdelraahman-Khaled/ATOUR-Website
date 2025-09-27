import CustomModal from "Components/CustomModal/CustomModal";
import { toast } from "react-toastify";
import "./ModalRemove.css";
import TrashIcon from "assets/Icons/TrashIcon";
import BookingAPI from "api/bookingApi";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";

const ModalRemove = ({
  id,
  showModalPayRemove,
  hideModalPayRemove,
  titleModal,
  title,
  text,
  reservation,
  refresh
}) => {
  const [savedReservation, setSavedReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentLanguage } = useLanguage();

  // ================== TRANSLATIONS ==================
  const content = {
    en: {
      yes: "Yes",
      no: "No",
      success: "Deleted successfully",
      error: "Failed to delete, please try again",
      noReservation: "No valid reservation to delete"
    },
    ar: {
      yes: "نعم",
      no: "لا",
      success: "تم الحذف بنجاح",
      error: "فشل في الحذف، حاول مرة اخرى",
      noReservation: "لا يوجد حجز صالح للحذف"
    },
    fr: {
      yes: "Oui",
      no: "Non",
      success: "Supprimé avec succès",
      error: "Échec de la suppression, veuillez réessayer",
      noReservation: "Aucune réservation valide à supprimer"
    },
    de: {
      yes: "Ja",
      no: "Nein",
      success: "Erfolgreich gelöscht",
      error: "Löschen fehlgeschlagen, bitte erneut versuchen",
      noReservation: "Keine gültige Reservierung zum Löschen"
    },
    es: {
      yes: "Sí",
      no: "No",
      success: "Eliminado con éxito",
      error: "Error al eliminar, inténtalo de nuevo",
      noReservation: "No hay reserva válida para eliminar"
    },
    tr: {
      yes: "Evet",
      no: "Hayır",
      success: "Başarıyla silindi",
      error: "Silme başarısız oldu, lütfen tekrar deneyin",
      noReservation: "Silinecek geçerli bir rezervasyon yok"
    },
    ru: {
      yes: "Да",
      no: "Нет",
      success: "Успешно удалено",
      error: "Не удалось удалить, попробуйте снова",
      noReservation: "Нет действительного бронирования для удаления"
    },
    zh: {
      yes: "是",
      no: "否",
      success: "删除成功",
      error: "删除失败，请重试",
      noReservation: "没有有效的预订可删除"
    },
    ko: {
      yes: "예",
      no: "아니요",
      success: "성공적으로 삭제됨",
      error: "삭제 실패, 다시 시도하세요",
      noReservation: "삭제할 유효한 예약이 없습니다"
    },
    pt: {
      yes: "Sim",
      no: "Não",
      success: "Excluído com sucesso",
      error: "Falha ao excluir, tente novamente",
      noReservation: "Nenhuma reserva válida para excluir"
    },
    ur: {
      yes: "جی ہاں",
      no: "نہیں",
      success: "کامیابی سے حذف ہوگیا",
      error: "حذف ناکام، دوبارہ کوشش کریں",
      noReservation: "حذف کرنے کے لیے کوئی درست ریزرویشن نہیں ہے"
    },
    ja: {
      yes: "はい",
      no: "いいえ",
      success: "正常に削除されました",
      error: "削除に失敗しました。もう一度お試しください",
      noReservation: "削除する有効な予約がありません"
    },
  };

  const t = content[currentLanguage] || content.en;
  // ==================================================

  useEffect(() => {
    if (reservation) {
      setSavedReservation(reservation);
    }
  }, [reservation]);

  const cancelButton = () => {
    hideModalPayRemove();
  };

  const removeButton = async () => {
    try {
      setLoading(true);

      let endpoint = "";
      if (savedReservation?.trip_id) {
        endpoint = `trip/${savedReservation.id}`;
      } else if (savedReservation?.effectivene_id) {
        endpoint = `effectivene/${savedReservation.id}`;
      } else if (savedReservation?.gift_id) {
        endpoint = `gift/${savedReservation.id}`;
      } else {
        toast.error(t.noReservation);
        setLoading(false);
        return;
      }

      // Call the API to cancel the booking
      await BookingAPI.cancelBooking(endpoint);
      hideModalPayRemove();
      toast.success(t.success);

      if (refresh) {
        refresh((prev) => !prev); // trigger parent refresh
      }
    } catch (error) {
      hideModalPayRemove();
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      show={showModalPayRemove}
      onHide={hideModalPayRemove}
      title={titleModal}
      newClass={"modal-remove"}
    >
      <div className="content-modal-remove">
        <div className="icon-remove-top">
          <TrashIcon />
        </div>
        <h2 className="title">{title}</h2>
        <p className="text">{text}</p>
        <div className="buttons-modal-bottom d-flex align-items-center gap-3">
          <button
            onClick={removeButton}
            className="btn-main btn-remove"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              t.yes
            )}
          </button>
          <button
            onClick={cancelButton}
            className="btn-main btn-cancel"
            disabled={loading}
          >
            {t.no}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalRemove;
