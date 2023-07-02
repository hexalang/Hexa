; Hexa Installer Script

[Setup]
AppName=Hexa
AppVersion=2023.01.01
AppId=hexalang
WizardStyle=modern
DefaultDirName={autopf}\Hexa
DefaultGroupName=Hexa
SetupIconFile=..\..\icon.ico
UninstallDisplayIcon={app}\icon.ico
Compression=lzma2
//Compression=none
SolidCompression=yes
AppPublisher=PeyTy
AppPublisherURL=https://hexalang.github.io
//UsePreviousPrivileges=no
//PrivilegesRequired=lowest
OutputBaseFilename=Hexa-2023.01.01
OutputDir=..\..
LicenseFile=..\..\LICENSE
ChangesEnvironment=true
WizardImageFile=164x314.bmp,192x386.bmp,246x459.bmp
WizardSmallImageFile=55x55.bmp,64x68.bmp,83x80.bmp
WizardSizePercent=100
WizardResizable=yes
ArchitecturesInstallIn64BitMode=x64
ArchitecturesAllowed=x64
DisableProgramGroupPage=yes
DisableWelcomePage=no
DisableReadyPage=yes

[Files]
Source: "..\..\..\..\greentea-dev\Teapot\node-v18.1.0-win-x64\node.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\..\icon.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\..\hexa.cmd"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\..\hexa-node.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\..\repl.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\..\repl.hexa"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\..\library\*.*"; DestDir: "{app}\library"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Hexa"; Filename: "{app}\hexa.cmd"

[CustomMessages]
Other=%nOther:

[Tasks]
Name: "addtopath"; Description: "Add Hexa to PATH"

[Registry]
Root: HKA; Subkey: "{code:GetEnvironmentKey}"; ValueType: expandsz; ValueName: "Path"; ValueData: "{olddata};{app}"; Tasks: addtopath; Check: NeedsAddPath(ExpandConstant('{app}'))

[Code]
procedure InitializeWizard;
begin
  WizardForm.Bevel.Visible := False;
  WizardForm.Bevel1.Visible := False;
end;

function GetEnvironmentKey(Param: string): string;
begin
  if IsAdminInstallMode then
    Result := 'System\CurrentControlSet\Control\Session Manager\Environment'
  else
    Result := 'Environment';
end;

// https://stackoverflow.com/a/23838239/261019
procedure Explode(var Dest: TArrayOfString; Text: String; Separator: String);
var
  i, p: Integer;
begin
  i := 0;
  repeat
    SetArrayLength(Dest, i+1);
    p := Pos(Separator,Text);
    if p > 0 then begin
      Dest[i] := Copy(Text, 1, p-1);
      Text := Copy(Text, p + Length(Separator), Length(Text));
      i := i + 1;
    end else begin
      Dest[i] := Text;
      Text := '';
    end;
  until Length(Text)=0;
end;

// https://stackoverflow.com/questions/3304463/how-do-i-modify-the-path-environment-variable-when-running-an-inno-setup-install
function NeedsAddPath(Param: string): boolean;
var
  OrigPath: string;
begin
  if not RegQueryStringValue(HKA, GetEnvironmentKey(''), 'Path', OrigPath)
  then begin
    Result := True;
    exit;
  end;
  Result := Pos(';' + Param + ';', ';' + OrigPath + ';') = 0;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  Path: string;
  ExePath: string;
  Parts: TArrayOfString;
  NewPath: string;
  i: Integer;
begin
  if not CurUninstallStep = usUninstall then begin
    exit;
  end;
  if not RegQueryStringValue(HKA, GetEnvironmentKey(''), 'Path', Path)
  then begin
    exit;
  end;
  NewPath := '';
  ExePath := ExpandConstant('{app}')
  Explode(Parts, Path, ';');
  for i:=0 to GetArrayLength(Parts)-1 do begin
    if CompareText(Parts[i], ExePath) <> 0 then begin
      NewPath := NewPath + Parts[i];
      if i < GetArrayLength(Parts) - 1 then begin
        NewPath := NewPath + ';';
      end;
    end;
  end;
  RegWriteExpandStringValue(HKA, GetEnvironmentKey(''), 'Path', NewPath);
end;
