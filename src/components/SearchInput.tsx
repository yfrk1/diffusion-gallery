import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: 'auto',
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    },
  },
}));

export default function SearchInput({ query, onEnter }: { query: string, onEnter: (val: string) => void}) {
  const optionOrString = (value: any) => typeof value === 'string' ? value : value.label;

  return <Autocomplete sx={{ width: "100%" }}
    multiple
    freeSolo
    options={[]}
    onChange={async (event: any, newValue: any) => {
      let str = '';
      if (newValue.length === 0) {
        return;
      } else if (newValue.length === 1) {
        str = optionOrString(newValue[0])
      } else {
        const head = optionOrString(newValue[0]);
        const tail = newValue.slice(1);
        str = tail.reduce((acc: string, option: any) => acc + ',' + (optionOrString(option)), head);
      }

      onEnter(str);
    }}
    limitTags={5}
    id="tags-outlined"
    getOptionLabel={(option) => optionOrString(option)}
    filterSelectedOptions
    renderTags={(value: { label: string }[], getTagProps) =>
      value.map((option: { label: string }, index: number) => (
        <Chip color="primary" size="small" label={optionOrString(option)} {...getTagProps({ index })} />
      ))
    }
    renderInput={(params) => (
      <Search sx={{ minWidth: '300px' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <FormControl variant="standard">
          <StyledInputBase
            ref={params.InputProps.ref}
            placeholder="Search…"
            inputProps={params.inputProps}
            startAdornment={params.InputProps.startAdornment}
          />
        </FormControl>
      </Search>
    )}
  />
}
