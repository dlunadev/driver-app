import { RelativePathString, useRouter } from "expo-router";
import { useAuth } from "@/src/context/auth.context";

type UseRequestLocationPermissionProps = {
  url: RelativePathString | any;
  step: number;
};

export const useRequestLocationPermission = ({ url, step }: UseRequestLocationPermissionProps) => {
  const router = useRouter();
  const { location } = useAuth();

  const requestLocationPermission = async () => {
    try {
      if (!location) {
        alert("No se pudo obtener la ubicación.");
        return;
      }

      router.push({
        pathname: url,
        params: { step },
      });
    } catch {
      alert("Ocurrió un error al solicitar permisos de ubicación.");
    }
  };

  return {
    requestLocationPermission,
  };
};
