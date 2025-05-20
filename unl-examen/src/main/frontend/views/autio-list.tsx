import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, DatePicker, Dialog, Grid, GridColumn, GridItemModel, TextField, NumberField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';

import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';

import { useDataProvider } from '@vaadin/hilla-react-crud';
import { ArtistaService } from 'Frontend/generated/endpoints';
import { CancionServices } from 'Frontend/generated/endpoints';	

import Artista from 'Frontend/generated/com/unl/music/base/models/Artista';
import { useEffect } from 'react';


export const config: ViewConfig = {
  title: 'Auto',
  menu: {
    icon: 'vaadin:clipboard-check',
    order: 1,
    title: 'Auto',
  },
};


type ArtistaEntryFormProps = {
  onArtistaCreated?: () => void;
};

type ArtistaEntryFormPropsUpdate = {
  arguments: any;
  onArtistaUpdated?: () => void;
};
//GUARDAR ARTISTA
function ArtistaEntryForm(props: ArtistaEntryFormProps) {
  const nombre = useSignal('');
  const genero = useSignal('');
  const album = useSignal('');
  const duracion = useSignal('');
  const url = useSignal('');
  const tipo = useSignal('');
  const createArtista = async () => {
    try {
      if (nombre.value.trim().length > 0 && genero.value.trim().length > 0) {
        const id_genero = parseInt(genero.value) +1;
        const id_album = parseInt(album.value) +1;
        await CancionServices.create(nombre.value, id_genero, parseInt(duracion.value), url.value, tipo.value, id_album);
        if (props.onArtistaCreated) {
          props.onArtistaCreated();
        }
       
        nombre.value = '';
        genero.value = '';
        album.value = '';
        duracion.value = '';
        url.value = '';
        tipo.value = '';
        dialogOpened.value = false;
        Notification.show('Cancion creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };
  
  let listaGenero = useSignal<String[]>([]);
  useEffect(() => {
    CancionServices.listaAlbumGenero().then(data =>
      //console.log(data)
      listaGenero.value = data 
    );
  }, []);
  let listaAlbum = useSignal<String[]>([]);
  useEffect(() => {
    CancionServices.listaAlbumCombo().then(data =>
      //console.log(data)
      listaAlbum.value = data
    );
  }, []);

  let listaTipo = useSignal<String[]>([]);
  useEffect(() => {
    CancionServices.listTipo().then(data =>
      //console.log(data)
      listaTipo.value = data
    );
  }, []);
  const dialogOpened = useSignal(false);
  return (
    <>
      <Dialog
        modeless
        headerTitle="Nueva Cancion"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button
              onClick={() => {
                dialogOpened.value = false;
              }}
            >
              Candelar
            </Button>
            <Button onClick={createArtista} theme="primary">
              Registrar
            </Button>
            
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField label="Nombre del cancion" 
            placeholder="Ingrese el nombre de la cancion"
            aria-label="Nombre del cancion"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <ComboBox label="Genero" 
            items={listaGenero.value}
            placeholder='Seleccione un genero'
            aria-label='Seleccione un genero de la lista'
            value={genero.value}
            onValueChanged={(evt) => (genero.value = evt.detail.value)}
            />
            <ComboBox label="Album" 
            items={listaAlbum.value}
            placeholder='Seleccione un album'
            aria-label='Seleccione un album de la lista'
            value={album.value}
            onValueChanged={(evt) => (album.value = evt.detail.value)}
            />
            <ComboBox label="Tipo" 
            items={listaTipo.value}
            placeholder='Seleccione un tipo de archivo'
            aria-label='Seleccione un tipo de archivo de la lista'
            value={tipo.value}
            onValueChanged={(evt) => (tipo.value = evt.detail.value)}
            />
            <NumberField  label="Duracion"
            
            placeholder="Ingrese la Duracion de la cancion"
            aria-label="Nombre la Duracion de la cancion"
            value={duracion.value}
            onValueChanged={(evt) => (duracion.value = evt.detail.value)}
          />
          <TextField label="Link de la cancion" 
            placeholder="Ingrese el link de la cancion"
            aria-label="Nombre el link de la cancion"
            value={url.value}
            onValueChanged={(evt) => (url.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button
            onClick={() => {
              dialogOpened.value = true;
            }}
          >
            Agregar
          </Button>
    </>
  );
}

//GUARDAR ARTISTA
const ArtistaEntryFormUpdate = function(props: ArtistaEntryFormPropsUpdate) {
  // Inicializar señales con los valores desde props
  const nombre = useSignal(props.arguments.nombre || '');
  const genero = useSignal(props.arguments.id_genero ? props.arguments.id_genero.toString() : '');
  const album = useSignal(props.arguments.id_albun ? props.arguments.id_albun.toString() : '');
  const duracion = useSignal(props.arguments.duracion ? props.arguments.duracion.toString() : '');
  const tipo = useSignal(props.arguments.tipo || '');
  const url = useSignal(props.arguments.url || '');

  let listaGenero = useSignal<String[]>([]);
  useEffect(() => {
    CancionServices.listaAlbumGenero().then(data => listaGenero.value = data);
  }, []);

  let listaAlbum = useSignal<String[]>([]);
  useEffect(() => {
    CancionServices.listaAlbumCombo().then(data => listaAlbum.value = data);
  }, []);

  let listaTipo = useSignal<String[]>([]);
  useEffect(() => {
    CancionServices.listTipo().then(data => listaTipo.value = data);
  }, []);

  const updateCancion = async () => {
    try {
      if (!nombre.value.trim()) {
        Notification.show('Nombre es obligatorio', { duration: 3000, theme: 'error' });
        return;
      }

      await CancionServices.update(
        parseInt(props.arguments.id),
        nombre.value,
        parseInt(genero.value),
        parseInt(duracion.value),
        url.value,
        tipo.value,
        parseInt(album.value)
      );

      if (props.onArtistaUpdated) {
        props.onArtistaUpdated();
      }

      dialogOpened.value = false;
      Notification.show('Canción actualizada', { duration: 3000, position: 'bottom-end', theme: 'success' });

    } catch (error) {
      console.error('Error al actualizar:', error);
      handleError(error);
    }
  };

  const dialogOpened = useSignal(false);

  return (
    <>
      <Dialog
        modeless
        headerTitle="Actualizar canción"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => dialogOpened.value = detail.value}
        footer={
          <>
            <Button onClick={() => dialogOpened.value = false}>Cancelar</Button>
            <Button onClick={updateCancion} theme="primary">Guardar cambios</Button>
          </>
        }
      >
        <VerticalLayout style={{ width: '18rem', maxWidth: '100%' }}>
          <TextField label="Nombre" value={nombre.value} onValueChanged={(e) => nombre.value = e.detail.value} />
          <ComboBox label="Género" items={listaGenero.value} value={genero.value} onValueChanged={(e) => genero.value = e.detail.value} />
          <ComboBox label="Álbum" items={listaAlbum.value} value={album.value} onValueChanged={(e) => album.value = e.detail.value} />
          <ComboBox label="Tipo" items={listaTipo.value} value={tipo.value} onValueChanged={(e) => tipo.value = e.detail.value} />
          <NumberField label="Duración (segundos)" value={duracion.value} onValueChanged={(e) => duracion.value = e.detail.value} />
          <TextField label="URL" value={url.value} onValueChanged={(e) => url.value = e.detail.value} />
        </VerticalLayout>
      </Dialog>

      <Button onClick={() => dialogOpened.value = true}>Editar</Button>
    </>
  );
};

export default function CancionView() {
  const dataProvider = useDataProvider<any>({
    list: () => CancionServices.listCancion(),
  });

  function indexLink({ item }: { item: Artista }) {
    const handleDelete = async () => {
      try {
        const cancionId = item.id ? parseInt(item.id.toString()) : undefined;
        if (cancionId === undefined) {
          throw new Error('Invalid song ID');
        }
        await CancionServices.delete(cancionId);
        dataProvider.refresh();
        Notification.show('Canción eliminada', { duration: 3000, position: 'bottom-end', theme: 'success' });
      } catch (error) {
        console.error('Error al eliminar:', error);
        Notification.show('No se pudo eliminar la canción', { duration: 3000, position: 'top-center', theme: 'error' });
      }
    };
  
    return (
      <span style={{ display: 'flex', gap: '8px' }}>
        <ArtistaEntryFormUpdate arguments={item} onArtistaUpdated={dataProvider.refresh} />
        <Button theme="error" onClick={handleDelete}>
          Eliminar
        </Button>
      </span>
    );
  }

  function indexIndex({model}:{model:GridItemModel<Artista>}) {
    return (
      <span>
        {model.index + 1} 
      </span>
    );
  }

  return (

    <main className="w-full h-full flex flex-col box-border gap-s p-m">

      <ViewToolbar title="Lista de Canciones">
        <Group>
          <ArtistaEntryForm onArtistaCreated={dataProvider.refresh}/>
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Nro" />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn path="genero" header="Género" />
        <GridColumn path="albun" header="Álbum" />
        <GridColumn path="tipo" header="Tipo" />
        <GridColumn path="duracion" header="Duración (s)" autoWidth />
        <GridColumn path="url" header="URL" />
        <GridColumn header="Acciones" renderer={indexLink} />
      </Grid>
    </main>
  );
}