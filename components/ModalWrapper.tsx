import { useModalMeta } from '@/contexts/modal'
import FCUsernameChangeModal from './modals/FCUsernameChangeModal'
import FCTwofaCreateModal from './modals/FCTwofaCreateModal'
import FCTwofaRemoveModal from './modals/FCTwofaRemoveModal'
import FCTwofaSessionCreateModal from './modals/FCTwofaSessionCreateModal'
import FCPasswordChangeModal from './modals/FCPasswordChangeModal'
import FCSubscriptionPurchaseModal from './modals/FCSubscriptionPurchaseModal'
import FCProductOrderConfirmModal from './modals/FCProductOrderConfirmModal'
import FCProfileEditModal from './modals/FCProfileEditModal'
import FCMediaModal from './modals/FCMediaModal'
import FCUserVaultAlbumCreateModal from './modals/FCUserVaultAlbumCreateModal'
import FCButtonNewConfirmationModal from './modals/FCButtonNewConfirmationModal'
import FCNewMessageModal from './modals/FCNewMessageModal'
import FCCreateTipModal from './modals/FCCreateTipModal'
import FCAccountMediaUpload from './modals/FCAccountMediaUpload'
import FCUserVaultAlbumEditModal from './modals/FCUserVaultAlbumEditModal'
import FCUserVaultAlbumDeleteModal from './modals/FCUserVaultAlbumDeleteModal'
import FCUserVaultAlbumSelectModal from './modals/FCUserVaultAlbumSelectModal'
import FCListCreate from './modals/FCListCreate'
import FCListEditModal from './modals/FCListEditModal'
import FCMediaVaultAlbumCreateModal from './modals/FCMediaVaultAlbumCreateModal'
import FCMediaVaultPickerModal from './modals/FCMediaVaultPickerModal'
import FCDatePicker from './common/datepicker/FCDatePicker'
import SubscriptionTierEditModal from './modals/SubscriptionTierEditModal'
import SubscriptionTierCreateModal from './modals/SubscriptionTierCreateModal'
import MediaTagModal from './modals/MediaTagModal'
import FCLoginModal from './modals/FCLoginModal'
import FCForgotPasswordModal from './modals/FCForgotPasswordModal'
import FCPostCreateModal from './modals/FCPostCreateModal'
import FCEmailChangeNewModal from './modals/FCEmailChangeNewModal'
import FCAccountMediaPermissionsModal from './modals/FCAccountMediaPermissionsModal'
import FCReportContentModal from './modals/FCReportContentModal'
import FCListAddAccountModal from './modals/FCListAddAccountModal'
import FCAgeGateModal from './modals/FCAgeGateModal'
import FCMediaBrowserModal from './modals/FCMediaBrowserModal'
import FCPostDetailModal from './modals/FCPostDetailModal'

export default function ModalWrapper() {
  const { metas, pop } = useModalMeta()
  const onCloseModal = () => {
    pop()
  }

  return (
    <div className="modal-wrapper">
      <div
        className={`xdModal ${metas.length > 0 ? 'back-drop' : ''}`}
        onClick={onCloseModal}
      ></div>

      {metas.map((meta, i) => {
        const clsname =
          i == metas.length - 1 ? 'active-modal' : 'inactive-modal'
        const args = { className: clsname, data: meta.data }

        if (meta.id == 'login') {
          return <FCLoginModal key={i} {...args} />
        }
        if (meta.id == 'forgotpassword') {
          return <FCForgotPasswordModal key={i} {...args} />
        }
        if (meta.id == 'usernamechange') {
          return <FCUsernameChangeModal key={i} {...args} />
        }
        if (meta.id == 'setup2fa') {
          return <FCTwofaCreateModal key={i} {...args} />
        }
        if (meta.id == 'remove2fa') {
          return <FCTwofaRemoveModal key={i} {...args} />
        }
        if (meta.id == '2fasessioncreate') {
          return <FCTwofaSessionCreateModal key={i} {...args} />
        }
        if (meta.id == 'passwordchange') {
          return <FCPasswordChangeModal key={i} {...args} />
        }
        if (meta.id == 'subscribe') {
          return <FCSubscriptionPurchaseModal key={i} {...args} />
        }
        if (meta.id == 'orderconfirm') {
          return <FCProductOrderConfirmModal key={i} {...args} />
        }
        if (meta.id == 'editprofile') {
          return <FCProfileEditModal key={i} {...args} />
        }
        if (meta.id == 'media') {
          return <FCMediaModal key={i} {...args} />
        }
        if (meta.id == 'uservaultalbumcreate') {
          return <FCUserVaultAlbumCreateModal key={i} {...args} />
        }
        if (meta.id == 'uservaultalbumedit') {
          return <FCUserVaultAlbumEditModal key={i} {...args} />
        }
        if (meta.id == 'uservaultalbumdelete') {
          return <FCUserVaultAlbumDeleteModal key={i} {...args} />
        }
        if (meta.id == 'uservaultalbumselect') {
          return <FCUserVaultAlbumSelectModal key={i} {...args} />
        }
        if (meta.id == 'buttonnewconfirmation') {
          return <FCButtonNewConfirmationModal key={i} {...args} />
        }
        if (meta.id == 'newmessage') {
          return <FCNewMessageModal key={i} {...args} />
        }
        if (meta.id == 'createtip') {
          return <FCCreateTipModal key={i} {...args} />
        }
        if (meta.id == 'accountmediaupload') {
          return <FCAccountMediaUpload key={i} {...args} />
        }
        if (meta.id == 'createlist') {
          return <FCListCreate key={i} {...args} />
        }
        if (meta.id == 'editlist') {
          return <FCListEditModal key={i} {...args} />
        }
        if (meta.id == 'mediavaultalbumcreate') {
          return <FCMediaVaultAlbumCreateModal key={i} {...args} />
        }
        if (meta.id == 'mediavaultpicker') {
          return <FCMediaVaultPickerModal key={i} {...args} />
        }
        if (meta.id == 'datepicker') {
          return <FCDatePicker key={i} {...args} />
        }
        if (meta.id == 'subscriptiontieredit') {
          return <SubscriptionTierEditModal key={i} {...args} />
        }
        if (meta.id == 'subscriptiontiercreate') {
          return <SubscriptionTierCreateModal key={i} {...args} />
        }
        if (meta.id == 'postcreate') {
          return <FCPostCreateModal key={i} {...args} />
        }
        if (meta.id == 'postdetail') {
          return <FCPostDetailModal key={i} {...args} />
        }
        if (meta.id == 'mediatag') {
          return <MediaTagModal key={i} {...args} />
        }
        if (meta.id == 'emailchangenew') {
          return <FCEmailChangeNewModal key={i} {...args} />
        }
        if (meta.id == 'accountmediapermissions') {
          return <FCAccountMediaPermissionsModal key={i} {...args} />
        }
        if (meta.id == 'reportcontent')
          return <FCReportContentModal key={i} {...args} />

        if (meta.id == 'listaddaccount')
          return <FCListAddAccountModal key={i} {...args} />

        if (meta.id == 'agegate') return <FCAgeGateModal key={i} {...args} />
        if (meta.id == 'mediabrowser')
          return <FCMediaBrowserModal key={i} {...args} />

        return <></>
      })}
    </div>
  )
}
