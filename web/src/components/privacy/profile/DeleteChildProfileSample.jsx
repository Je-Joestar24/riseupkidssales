import { Button } from '@mui/material'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import { useTranslation } from '../../../hooks/useTranslation.js'

const BORDER = '#E8E3DC'
const DELETE_COLOR = '#B85C3D'
const HOVER_BG = '#FDE8DE'

export default function DeleteChildProfileSample() {
  const { t } = useTranslation()

  const handleDelete = () => {
    // TODO: wire to actual delete flow (e.g. modal + API)
  }

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<PersonOffIcon sx={{ fontSize: 20 }} />}
      onClick={handleDelete}
      aria-label={t('privacySettings.profile.deleteButton')}
      sx={{
        height: 44,
        justifyContent: 'flex-start',
        px: 2,
        borderColor: BORDER,
        color: DELETE_COLOR,
        '&:hover': {
          borderColor: BORDER,
          bgcolor: HOVER_BG,
          color: DELETE_COLOR,
        },
        borderRadius: '10px',
        fontWeight: 600
      }}
    >
      {t('privacySettings.profile.deleteButton')}
    </Button>
  )
}
